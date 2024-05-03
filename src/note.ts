import { z } from "zod";
import { BaseContent } from "./note/baseContent.js";

export const Note = BaseContent.extend({
  type: z.literal("Note"),
});
export type Note = z.infer<typeof Note>;
