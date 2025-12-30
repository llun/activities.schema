import { z } from "zod";
import { BaseContent } from "./note/baseContent.js";
import { Note } from "./question/note.js";

export const ENTITY_TYPE_QUESTION = "Question";
export const Question = BaseContent.extend({
  type: z.literal(ENTITY_TYPE_QUESTION),

  endTime: z
    .string()
    .describe("Question end time in ISO 8601 datetime format")
    .optional(),
  closed: z
    .string()
    .describe(
      "The datetime when the poll was closed, in ISO 8601 format. Used when a poll is closed early"
    )
    .nullish(),

  // Single-choice poll options (mutually exclusive with anyOf)
  oneOf: Note.array()
    .describe("Poll options for single-choice polls")
    .optional(),
  // Multiple-choice poll options (mutually exclusive with oneOf)
  anyOf: Note.array()
    .describe("Poll options for multiple-choice polls")
    .optional(),

  // Misskey extension for total unique voters
  votersCount: z
    .number()
    .describe("Total number of unique voters (Misskey extension)")
    .optional(),
});
export type Question = z.infer<typeof Question>;
