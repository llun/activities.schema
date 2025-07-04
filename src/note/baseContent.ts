import { z } from "zod";
import { Attachment } from "./attachment.js";
import { Tag } from "./tag.js";
import { createCollectionSchema, createCollectionPageSchema, CollectionType, CollectionPageType } from "../collection.js";
import { LikeActivity } from "../like.js"; // For likes collection items
import { AnnounceActivity } from "../announce.js"; // For shares collection items
import { Actor } from "../actor.js"; // For likers/sharers collection items
import { Note } from "../note.js"; // For replies collection items

// Define specific item types for different collections
const ReplyItemSchema = z.union([z.lazy(() => Note), z.string().url()]); // Note or URL to Note
const LikeItemSchema = z.union([LikeActivity, Actor, z.string().url()]); // Like activity, Actor (liker), or URL
const ShareItemSchema = z.union([AnnounceActivity, Actor, z.string().url()]); // Announce activity, Actor (booster), or URL

// Create specific collection schemas
const RepliesCollectionSchema = createCollectionSchema(ReplyItemSchema);
// For Likes/Shares, Mastodon's embedded version on a status often just has totalItems.
// However, a full collection could also be embedded or linked.
// The createCollectionSchema makes 'items' optional, so it can handle both.
const LikesCollectionSchema = createCollectionSchema(LikeItemSchema);
const SharesCollectionSchema = createCollectionSchema(ShareItemSchema);


export const BaseObjectSchema = z.object({
  "@context": z
    .union([
      z.string(),
      z.array(z.union([z.string(), z.record(z.string())])),
    ])
    .optional()
    .describe(
      "The JSON-LD context. Can be a URL or an array of URLs/objects."
    ),
  id: z.string().url().describe("The unique URI of the object"),
  type: z.string().describe("The type of the object (e.g., Note, Question, Article)"), // Will be narrowed in specific types

  attributedTo: z.string().url().describe("URI of the actor who created this object"),

  content: z.string().optional().describe("The content of the object, typically HTML"),
  contentMap: z.record(z.string()).optional().describe("A map of content per language code"),

  name: z.string().optional().describe("A name or title for the object"),
  nameMap: z.record(z.string()).optional().describe("A map of name per language code"),

  summary: z.string().nullish().describe("A summary of the object (used for content warnings/spoiler text)"),
  // summaryMap is less common for Mastodon's primary use of summary as CW, but kept for completeness
  summaryMap: z.record(z.string()).nullish().describe("A map of summary per language code"),

  sensitive: z.boolean().optional().describe("Indicates that content may be sensitive (as:sensitive)"),

  inReplyTo: z.string().url().nullish().describe("URI of the object this object is in reply to"),

  published: z.string().datetime({ offset: true }).describe("The date and time the object was published (ISO 8601)"),
  updated: z.string().datetime({ offset: true }).nullish().describe("The date and time the object was last updated (ISO 8601)"),

  url: z.string().url().optional().describe("A URL linking to a public representation of the object"),

  to: z.array(z.string().url()).optional().describe("Audience: Actors or collections targeted for delivery"),
  cc: z.array(z.string().url()).optional().describe("Audience: Actors or collections copied for delivery"),
  // bto and bcc are also possible but less common for Mastodon objects themselves

  tag: z.array(Tag).optional().describe("Tags associated with this object (Mentions, Hashtags, Emojis)"),
  attachment: z.array(Attachment).optional().describe("Attached media or other objects"),

  replies: z.union([z.string().url(), RepliesCollectionSchema]).nullish().describe("A collection of replies to this object. Can be a URL or an embedded collection."),

  // Mastodon specific extensions for likes/shares counts on the object itself
  // In pure ActivityPub, these are often derived from observing Like/Announce activities
  // However, Mastodon includes them directly on the status object.
  // These collections typically only include `totalItems` when embedded directly on a status.
  likes: z.union([z.string().url(), LikesCollectionSchema]).nullish().describe("Collection of likes for this object. Mastodon often includes totalItems."),
  shares: z.union([z.string().url(), SharesCollectionSchema]).nullish().describe("Collection of shares (boosts/announcements) for this object. Mastodon often includes totalItems."),

  // For other potential object types Mastodon might transform
  // duration: z.string().optional().describe("When the object describes a time-based resource (e.g. audio or video)"),
  // mediaType: z.string().optional().describe("The MIME type of the content, if applicable"),
});

export type BaseObjectSchema = z.infer<typeof BaseObjectSchema>;
