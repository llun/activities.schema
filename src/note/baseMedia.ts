import { z } from "zod";

export const BaseMedia = z.object({
  // Type will be specialized by extending schemas (e.g., Image, Video, Audio, Document)
  type: z.string().describe("The type of the media object"),
  mediaType: z.string().optional().describe("The MIME type of the media content"),
  url: z.string().url().describe("A URL link to the media content"),

  name: z.string().nullish().describe("A name or title for the media object"),
  summary: z.string().nullish().describe("A summary or description of the media object (alt text)"),

  width: z.number().int().positive().optional().describe("The width of the visual media in pixels"),
  height: z.number().int().positive().optional().describe("The height of the visual media in pixels"),

  duration: z.string().optional().describe("The duration of the media content (e.g., ISO 8601 duration format like 'PT2M30S' for audio/video)"),

  // Mastodon specific extensions often found on media attachments
  blurhash: z.string().optional().describe("A BlurHash string for the media (toot:blurhash)"),
  focalPoint: z.tuple([z.number(), z.number()]).optional().describe("Focal point coordinates [x, y] (toot:focalPoint), where x and y are between -1.0 and 1.0."),
});

export type BaseMedia = z.infer<typeof BaseMedia>;
