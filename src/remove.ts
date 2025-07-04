import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { BaseObjectSchema } from "./note/baseContent.js";
import { Actor } from "./actor.js";
import { Collection } from "./collection.js"; // Origin/target is often a collection

const RemovedObject = z.union([BaseObjectSchema, Actor, z.string().url()]);
const OriginCollection = z.union([Collection, z.string().url()]);

export const RemoveActivity = BaseActivity.extend({
  type: z.literal("Remove"),
  object: RemovedObject.describe("The object being removed."),
  origin: OriginCollection.optional().describe("The collection from which the object is being removed."),
  // 'target' could also be used if 'origin' is not appropriate for the context
});

export type RemoveActivity = z.infer<typeof RemoveActivity>;
