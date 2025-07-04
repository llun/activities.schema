import { z } from "zod";
import { BaseObjectSchema } from "./note/baseContent.js"; // Updated import name

export const NoteType = z.literal("Note");
export const ArticleType = z.literal("Article");
export const PageType = z.literal("Page");
// Other object types Mastodon might transform (Image, Audio, Video, Event)
// These often have more specific schemas if they are primary objects,
// but Mastodon treats incoming unknown types often by trying to make a Note-like status.

export const Note = BaseObjectSchema.extend({
  type: NoteType,
});
export type Note = z.infer<typeof Note>;

// Article might have more specific properties, but for now, can extend BaseObjectSchema
export const Article = BaseObjectSchema.extend({
  type: ArticleType,
});
export type Article = z.infer<typeof Article>;

export const Page = BaseObjectSchema.extend({
  type: PageType,
});
export type Page = z.infer<typeof Page>;

// If specific schemas for ImageObject, AudioObject, VideoObject, EventObject are needed
// (distinct from attachments), they would be defined here too.
// For now, Mastodon transforms them into statuses, so their structure would resemble Note.
