import { z } from "zod";
import { Follow } from "./follow.js";

export const Reject = z.object({
  id: z.string(),
  actor: z.string(),
  type: z.literal("Reject"),
  object: Follow,
});
