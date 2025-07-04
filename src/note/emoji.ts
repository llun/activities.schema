import { z } from "zod";
import { Image } from "../image.js"; // Image schema should have type, mediaType, url

export const Emoji = z.object({
  id: z.string().url().optional().describe("The unique URI of the emoji definition"),
  type: z.literal("Emoji").describe("Indicates that this is a custom Emoji object (toot:Emoji)"),
  name: z.string().describe("The shortcode of the emoji (e.g., :thonking:)"),
  icon: Image.describe("An Image object representing the emoji's visual content"),
  updated: z.string().datetime({ offset: true }).optional().describe("Timestamp of when the emoji was last updated (ISO 8601). Optional in AP tag context."),
  // Mastodon's CustomEmoji entity (REST API) has other fields like static_url, visible_in_picker, category
  // but for ActivityPub tags, id, type, name, icon are primary.
});

export type Emoji = z.infer<typeof Emoji>;
