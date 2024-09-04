import { z } from "zod";
import { Attachment } from "./attachment.js";
import { Emoji } from "./emoji.js";
import { Mention } from "./mention.js";

export const BaseContent = z.object({
  id: z.string(),
  url: z.string({ description: "Note URL" }),
  attributedTo: z.string({ description: "Note publisher" }),

  to: z.union([z.string(), z.string().array()]),
  cc: z.union([z.string(), z.string().array()]),

  inReplyTo: z.string().nullable(),

  summary: z.string({ description: "Note short summary" }).optional(),
  summaryMap: z
    .record(z.string(), { description: "Note short summary in each locale" })
    .optional(),

  content: z
    .union([
      z.string({ description: "Note content" }),
      z.string({ description: "Note content in array from Wordpress" }).array(),
    ])
    .optional(),
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
    .optional(),

  attachment: z.union([Attachment, Attachment.array()]).optional(),
  tag: z.union([Mention, Emoji]).array(),

  published: z.string({ description: "Object published datetime" }),
  updated: z.string({ description: "Object updated datetime" }).optional(),
});

export type BaseContent = z.infer<typeof BaseContent>;
