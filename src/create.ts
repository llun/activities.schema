import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { BaseObjectSchema } from "./note/baseContent.js"; // For Note, Question, etc.
import { Actor } from "./actor.js"; // For creating an Actor (though less common via Create by others)

// The object of a Create can be any ActivityPub object or a link to one.
const CreatedObject = z.union([
  BaseObjectSchema, // e.g. Note, Question, Article
  Actor,            // e.g. A new actor object being published (less common as a federated Create)
  z.string().url()  // URL to an object (if object is already hosted elsewhere)
]);

export const CreateActivity = BaseActivity.extend({
  type: z.literal("Create"),
  object: CreatedObject.describe("The object that is being created."),
  // published, to, cc are inherited from BaseActivity
});

export type CreateActivity = z.infer<typeof CreateActivity>;
