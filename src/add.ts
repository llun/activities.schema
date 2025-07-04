import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { BaseObjectSchema } from "./note/baseContent.js";
import { Actor } from "./actor.js";
import { Collection } from "./collection.js"; // Target is often a collection

const AddedObject = z.union([BaseObjectSchema, Actor, z.string().url()]);
const TargetCollection = z.union([Collection, z.string().url()]);

export const AddActivity = BaseActivity.extend({
  type: z.literal("Add"),
  object: AddedObject.describe("The object being added."),
  target: TargetCollection.optional().describe("The collection to which the object is being added."),
});

export type AddActivity = z.infer<typeof AddActivity>;
