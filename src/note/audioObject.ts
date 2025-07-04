import { z } from "zod";
import { BaseMedia } from "./baseMedia.js";

export const AudioObjectType = z.literal("Audio");

export const AudioObject = BaseMedia.extend({
  type: AudioObjectType,
  // Duration is particularly relevant for Audio objects
  duration: z.string().describe("The duration of the audio content (e.g., ISO 8601 duration format 'PT2M30S')").optional(),
});

export type AudioObject = z.infer<typeof AudioObject>;
