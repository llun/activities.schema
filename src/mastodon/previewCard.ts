// This schema is base on https://docs.joinmastodon.org/entities/PreviewCard/
import { z } from "zod";

export const PreviewCard = z.object({
  url: z.string({ description: "Location of linked resource" }),
  title: z.string({ description: "Title of linked resource" }),
  description: z.string({ description: "Description of preview" }),
  type: z.enum(["link", "photo", "video", "rich"], {
    description: "The type of the preview card",
  }),

  author_name: z.string({ description: "The author of the original resource" }),
  author_url: z.string({
    description: "A link to the author of the original resource",
  }),

  provider_name: z.string({
    description: "The provider of the original resource",
  }),
  provider_url: z.string({
    description: "A link to the provider of the original resource",
  }),

  html: z.string({
    description: "HTML to be used for generating the preview card",
  }),
  width: z.number({ description: "Width of preview, in pixels" }),
  height: z.number({ description: "Height of preview, in pixels" }),

  image: z.string({ description: "Preview thumbnail url" }).nullable(),
  embed_url: z.string({
    description: "Used for photo embeds, instead of custom html",
  }),
  blurhash: z
    .string({
      description:
        "A hash computed by the [BlurHash algorithm](https://github.com/woltapp/blurhash), for generating colorful preview thumbnails when media has not been downloaded yet",
    })
    .nullable(),
});
export type PreviewCard = z.infer<typeof PreviewCard>;
