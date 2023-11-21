import { z } from "zod";
import { Follow } from "./follow.js";
import { Like } from "./like.js";

export const Undo = z.object({
  id: z.string(),
  actor: z.string(),
  type: z.literal("Undo"),
  object: z.union([Like, Follow]),
});
