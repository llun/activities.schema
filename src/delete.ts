import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { BaseObjectSchema } from "./note/baseContent.js"; // For Tombstone or object itself
import { Actor } from "./actor.js";

// The object of a Delete is typically the object being deleted,
// or a Tombstone representation of it.
const DeletedObject = z.union([
  BaseObjectSchema, // Could be a Tombstone or the object itself
  Actor,            // Deleting an actor
  z.string().url()  // URL to the object being deleted
]);

export const DeleteActivity = BaseActivity.extend({
  type: z.literal("Delete"),
  object: DeletedObject.describe("The object that is being deleted."),
  // origin can be used to specify the original source of the object if object is a Tombstone
});

export type DeleteActivity = z.infer<typeof DeleteActivity>;
