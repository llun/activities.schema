import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { BaseObjectSchema } from "./note/baseContent.js"; // For Note, Question, Article, etc.
import { Actor } from "./actor.js"; // For updating an Actor profile

// The object of an Update is the full new representation of the object.
const UpdatedObject = z.union([
  BaseObjectSchema,
  Actor,
  z.string().url() // Should resolve to the new state of the object
]);

export const UpdateActivity = BaseActivity.extend({
  type: z.literal("Update"),
  object: UpdatedObject.describe("The object that is being updated, with its new state."),
});

export type UpdateActivity = z.infer<typeof UpdateActivity>;
