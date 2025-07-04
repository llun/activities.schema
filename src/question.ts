import { z } from "zod";
import { BaseObjectSchema } from "./note/baseContent.js"; // Updated import name
import { PollOption } from "./question/note.js"; // Renamed for clarity from just Note

export const QuestionType = z.literal("Question");

export const Question = BaseObjectSchema.extend({
  type: QuestionType,

  // Poll-specific properties from ActivityStreams Vocabulary & Mastodon extensions
  endTime: z.string().datetime({ offset: true }).optional().describe("Timestamp for when voting will close on the poll (ISO 8601)"),
  closed: z.string().datetime({ offset: true }).optional().describe("Timestamp for when voting actually closed (ISO 8601). If present, poll is closed."),

  votersCount: z.number().int().nonnegative().optional().describe("How many distinct actors have voted (toot:votersCount)"),

  oneOf: z.array(PollOption).optional().describe("Array of options for a single-choice poll. Each option is a Note."),
  anyOf: z.array(PollOption).optional().describe("Array of options for a multiple-choice poll. Each option is a Note."),

  // According to ActivityStreams, Question can also have 'options' which is a list of Objects.
  // Mastodon uses oneOf/anyOf with Note objects for options.
}).refine(data => data.oneOf || data.anyOf, {
  message: "A Question (poll) must have either 'oneOf' or 'anyOf' options.",
});

export type Question = z.infer<typeof Question>;
