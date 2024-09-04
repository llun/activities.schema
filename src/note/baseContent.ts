import { z } from "zod";
import { Attachment } from "./attachment.js";
import { Tag } from "./tag.js";

export const BaseContent = z.object({
  id: z.string(),
  url: z.string({ description: "Note URL" }),
  attributedTo: z.string({ description: "Note publisher" }),

  to: z.union([z.string(), z.string().array()]),
  cc: z.union([z.string(), z.string().array()]),

  inReplyTo: z.string().nullish(),

  summary: z.string({ description: "Note short summary" }).nullish(),
  summaryMap: z
    .record(z.string(), { description: "Note short summary in each locale" })
    .nullish(),

  content: z
    .union([
      z.string({ description: "Note content" }),
      z.string({ description: "Note content in array from Wordpress" }).array(),
    ])
    .nullish(),
  contentMap: z
    .union([
      z.record(z.string(), { description: "Note content in each locale" }),
      z
        .string({
          description:
            "Some activity pub server use content map as array with content in the first element",
        })
        .array(),
    ])
    .nullish(),

  attachment: z.union([Attachment, Attachment.array()]).nullish(),
  tag: z.union([Tag, Tag.array()]),

  published: z.string({ description: "Object published datetime" }),
  updated: z.string({ description: "Object updated datetime" }).nullish(),
});

export type BaseContent = z.infer<typeof BaseContent>;
