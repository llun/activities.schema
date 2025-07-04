import { z } from "zod";
import { BaseMedia } from "./baseMedia.js";

export const VideoObjectType = z.literal("Video");

export const VideoObject = BaseMedia.extend({
  type: VideoObjectType,
  // Duration is particularly relevant for Video objects
  duration: z.string().describe("The duration of the video content (e.g., ISO 8601 duration format 'PT2M30S')").optional(),
});

export type VideoObject = z.infer<typeof VideoObject>;
