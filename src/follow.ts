import { z } from "zod";

export const Follow = z.object({
  id: z.string(),
  type: z.literal("Follow"),
  actor: z.string(),
  object: z.string(),
});

export type Follow = z.infer<typeof Follow>;
