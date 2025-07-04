import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { Follow } from "./follow.js"; // Follow activity schema
import { BaseObjectSchema } from "./note/baseContent.js"; // Or a more generic object/link type

const AcceptedObject = z.union([
  Follow,
  BaseObjectSchema, // e.g. accepting a friend request represented by an Offer activity
  z.string().url() // URL to an object being accepted
]);

export const AcceptActivity = BaseActivity.extend({
  type: z.literal("Accept"),
  object: AcceptedObject.describe("The object that was accepted (e.g., a Follow activity, an Offer)."),
});

export type AcceptActivity = z.infer<typeof AcceptActivity>;
