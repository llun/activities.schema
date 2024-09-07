import { z } from "zod";
import { BaseContent } from "./note/baseContent.js";
import { Note } from "./question/note.js";

export const ENTITY_TYPE_QUESTION = "Question";
export const Question = BaseContent.extend({
  type: z.literal(ENTITY_TYPE_QUESTION),

  endTime: z.string({ description: "Question end time" }),
  oneOf: Note.array(),
});
export type Question = z.infer<typeof Question>;
