import { z } from "zod";

export const Note = z.object({
  type: z.literal("Note"),
  name: z.string(),
  replies: z.object({
    type: z.literal("Collection"),
    totalItems: z.number(),
  }),
});

export type Note = z.infer<typeof Note>;
