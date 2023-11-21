import { z } from "zod";

export const Emoji = z.object({
  type: z.literal("Emoji"),
  name: z.string(),
  updated: z.string(),
});

export type Emoji = z.infer<typeof Emoji>;
