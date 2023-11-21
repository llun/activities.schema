import { z } from "zod";
import { Attachment } from "./note/attachment.js";
import { Emoji } from "./note/emoji.js";
import { Mention } from "./note/mention.js";

const BaseContent = z.object({
  id: z.string(),
  url: z.string({ description: "Note URL" }),
  attributedTo: z.string({ description: "Note publisher" }),

  to: z.union([z.string(), z.string().array()]),
  cc: z.union([z.string(), z.string().array()]),

  inReplyTo: z.string().optional(),

  summary: z.string({ description: "Note short summary" }).optional(),
  summaryMap: z
    .record(z.string(), { description: "Note short summary in each locale" })
    .optional(),

  content: z.string({ description: "Note content" }).optional(),
  contentMap: z
    .record(z.string(), { description: "Note content in each locale" })
    .optional(),

  attachment: z.union([Attachment, Attachment.array()]).optional(),
  tag: z.union([Mention, Emoji]).array(),

  published: z.string({ description: "Object published datetime" }),
  updated: z.string({ description: "Object updated datetime" }).optional(),
});

type BaseContent = z.infer<typeof BaseContent>;

export const Note = BaseContent.extend({
  type: z.literal("Note"),
});
export type Note = z.infer<typeof Note>;
