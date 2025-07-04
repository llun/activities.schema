import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { FollowActivity } from "./follow.js";
import { LikeActivity } from "./like.js";
import { AnnounceActivity } from "./announce.js";
import { BlockActivity } from "./block.js"; // Assuming BlockActivity will be created

// The object of an Undo is the activity that is being undone.
// This can be any other activity.
const UndoneActivity = z.union([
  FollowActivity,
  LikeActivity,
  AnnounceActivity,
  z.lazy(() => BlockActivity), // Use lazy if BlockActivity is in a separate file and might cause circular deps
  // Potentially any BaseActivity, but often specific ones are undone.
  BaseActivity,
  z.string().url() // URL to an activity
]);

export const UndoActivity = BaseActivity.extend({
  type: z.literal("Undo"),
  object: UndoneActivity.describe("The activity that is being undone."),
});

export type UndoActivity = z.infer<typeof UndoActivity>;
