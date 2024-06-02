// This schema is base on https://docs.joinmastodon.org/entities/MediaAttachment/#gifv
import { z } from "zod";
import { BaseMediaAttachment } from "./base.js";

export const Gifv = BaseMediaAttachment.extend({
  type: z
    .literal("gifv")
    .describe("The type of the attachment (Looping, soundless animation)"),
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
export type Gifv = z.infer<typeof Gifv>;
