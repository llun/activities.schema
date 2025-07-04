import { z } from "zod";
import { Image } from "./image.js";
import { PropertyValue } from "./note/propertyValue.js";
// Assuming a generic Collection schema exists or will be created, e.g., in ./collection.ts
// For now, we'll use z.string().url() for collection URIs
// import { Collection } from "./collection.js";
// import { Tag } from "./note/tag.js"; // For featuredTags item type

export const ActorType = z.union([
  z.literal("Person"),
  z.literal("Service"),
  z.literal("Application"),
  z.literal("Group"),
  z.literal("Organization"), // Added based on common ActivityPub types
]);
export type ActorType = z.infer<typeof ActorType>;

export const PublicKey = z.object({
  id: z.string().describe("Key ID"),
  owner: z.string().url().describe("Owner of the key (actor URL)"),
  publicKeyPem: z.string().describe("PEM encoded public key"),
});
export type PublicKey = z.infer<typeof PublicKey>;

export const ActorEndpoints = z.object({
  sharedInbox: z.string().url().optional().describe("URL of the shared inbox"),
  // As per ActivityPub spec, other endpoints can also be listed here.
  // Example: uploadMedia: z.string().url().optional().describe("Endpoint for uploading media")
});
export type ActorEndpoints = z.infer<typeof ActorEndpoints>;

export const Actor = z.object({
  "@context": z
    .union([
      z.string(),
      z.array(z.union([z.string(), z.record(z.string())])),
    ])
    .optional()
    .describe(
      "The JSON-LD context. Can be a URL or an array of URLs/objects."
    ),
  id: z.string().url().describe("The unique URI of the actor"),
  type: ActorType,
  following: z.string().url().optional().describe("URI of the collection of actors this actor is following"),
  followers: z.string().url().optional().describe("URI of the collection of actors followers of this actor"),
  inbox: z.string().url().describe("URI of the actor's inbox for receiving activities"),
  outbox: z.string().url().describe("URI of the actor's outbox for sending activities"),
  preferredUsername: z.string().optional().describe("The actor's preferred username"),
  name: z.string().optional().describe("The actor's display name"),
  summary: z.string().nullish().describe("A summary or bio of the actor"),
  url: z.string().url().optional().describe("A URL linking to a page representing the actor"),
  published: z.string().datetime({ offset: true }).nullish().describe("The date and time the actor was created (ISO 8601)"),
  updated: z.string().datetime({ offset: true }).nullish().describe("The date and time the actor was last updated (ISO 8601)"),

  manuallyApprovesFollowers: z.boolean().optional().describe("Does this actor manually approve followers? (as:manuallyApprovesFollowers)"),

  publicKey: PublicKey.optional().describe("The actor's public key (sec:publicKey)"),

  endpoints: ActorEndpoints.optional().describe("A map of additional endpoints for the actor"),

  icon: Image.nullish().describe("An image icon for the actor (e.g., avatar)"),
  image: Image.nullish().describe("An image banner for the actor (e.g., header)"),

  attachment: z.array(PropertyValue).optional().describe("Profile metadata as an array of PropertyValue (schema:PropertyValue)"),

  discoverable: z.boolean().optional().describe("Opt-in to discovery features (toot:discoverable)"),
  indexable: z.boolean().optional().describe("Opt-in to search engine indexing (toot:indexable). Note: Mastodon uses 'noindex' in its API which is the inverse."),
  suspended: z.boolean().optional().describe("Whether the account is suspended (toot:suspended)"),
  memorial: z.boolean().optional().describe("Whether the account is a memorial account (toot:memorial)"),

  featured: z.string().url().optional().describe("URI of a collection of featured objects/statuses (toot:featured)"),
  // featured: z.lazy(() => Collection.extend({ items: z.array(z.union([Status, z.string().url()])) })).optional(), // More specific if Status schema is available

  featuredTags: z.string().url().optional().describe("URI of a collection of featured tags (toot:featuredTags)"),
  // featuredTags: z.lazy(() => Collection.extend({ items: z.array(Tag) })).optional(), // More specific if Tag schema is available

  alsoKnownAs: z.array(z.string().url()).optional().describe("A list of URIs of other actors affiliated with this actor (for migration, etc.)"),
  movedTo: z.string().url().optional().describe("URI of the new actor this account has moved to (as:movedTo)"),
});
export type Actor = z.infer<typeof Actor>;

export const Person = Actor.extend({
  type: z.literal("Person"),
});
export type Person = z.infer<typeof Person>;

export const Service = Actor.extend({
  type: z.literal("Service"),
});
export type Service = z.infer<typeof Service>;

export const Application = Actor.extend({
  type: z.literal("Application"),
});
export type Application = z.infer<typeof Application>;

export const Group = Actor.extend({
  type: z.literal("Group"),
});
export type Group = z.infer<typeof Group>;

export const Organization = Actor.extend({
  type: z.literal("Organization"),
});
export type Organization = z.infer<typeof Organization>;
