import { z } from "zod";
import { BaseContent } from "./note/baseContent.js";

export const ENTITY_TYPE_NOTE = "Note";
export const Note = BaseContent.extend({
  type: z.literal(ENTITY_TYPE_NOTE),
});
export type Note = z.infer<typeof Note>;
