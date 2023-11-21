import { z } from "zod";

import { Note } from "./note.js";

export const Like = z.object({
  type: z.literal("Like"),
  id: z.string(),
  actor: z.string(),
  object: z.union([z.string(), Note]),
});

export type Like = z.infer<typeof Like>;
