// This schema is base on https://docs.joinmastodon.org/entities/MediaAttachment/
import { z } from "zod";

export const BaseMediaAttachment = z.object({
  id: z.string({
    description: "The ID of the attachment in the database",
  }),

  url: z.string({
    description: "The location of the original full-size attachment",
  }),
  preview_url: z
    .string({
      description: "The location of a scaled-down preview of the attachment",
    })
    .nullable(),
  remote_url: z
    .string({
      description:
        "The location of the full-size original attachment on the remote website",
    })
    .nullable(),

  description: z
    .string({
      description:
        "Alternate text that describes what is in the media attachment, to be used for the visually impaired or when media attachments do not load",
    })
    .nullable(),

  bluehash: z
    .string({
      description:
        "hash computed by the [BlurHash algorithm](https://github.com/woltapp/blurhash), for generating colorful preview thumbnails when media has not been downloaded yet.",
    })
    .nullable(),
});
export type BaseMediaAttachment = z.infer<typeof BaseMediaAttachment>;
