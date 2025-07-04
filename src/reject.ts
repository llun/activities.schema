import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { FollowActivity } from "./follow.js"; // Typically rejecting a Follow activity
import { BaseObjectSchema } from "./note/baseContent.js"; // Or a more generic object/link type

// Object being rejected, commonly a FollowActivity or an Offer.
const RejectedObject = z.union([
  FollowActivity,
  BaseObjectSchema, // e.g. rejecting an Offer activity
  z.string().url()
]);

export const RejectActivity = BaseActivity.extend({
  type: z.literal("Reject"),
  object: RejectedObject.describe("The object that was rejected (e.g., a Follow activity)."),
});

export type RejectActivity = z.infer<typeof RejectActivity>;
