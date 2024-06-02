// This schema is base on https://docs.joinmastodon.org/entities/MediaAttachment/#video
import { z } from "zod";
import { BaseMediaAttachment } from "./base.js";

export const Video = BaseMediaAttachment.extend({
  type: z.literal("video").describe("The type of the attachment (Video clip)"),
  meta: z.object({
    length: z.string(),
    duration: z.number(),
    fps: z.number(),

    size: z.string({
      description: "Video width and height in string wxh format",
    }),
    width: z.number(),
    height: z.number(),
    aspect: z.number({
      description: "Aspect ratio of the video (width/height)",
    }),

    audio_encode: z.string(),
    audio_bitrate: z.string(),
    audio_channels: z.string(),

    original: z.object({
      width: z.number(),
      height: z.number(),
      frame_rate: z.string(),
      duration: z.number(),
      bitrate: z.number(),
    }),
    small: z
      .object({
        width: z.number(),
        height: z.number(),
        size: z.string(),
        aspect: z.number(),
      })
      .describe("A video preview in static image")
      .nullish(),
  }),
});
export type Video = z.infer<typeof Video>;
