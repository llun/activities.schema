import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { Actor } from "./actor.js"; // Actor being followed

// The object of a Follow activity is typically an Actor or a URL to an Actor.
const FollowedObject = z.union([
  z.string().url(),
  Actor
]);

export const FollowActivity = BaseActivity.extend({
  type: z.literal("Follow"),
  object: FollowedObject.describe("The actor that is being followed."),
});

export type FollowActivity = z.infer<typeof FollowActivity>;

// For convenience, if Follow is used as an object itself (e.g. in Accept/Reject)
// it might be simpler, but the full activity is usually what's exchanged.
// The previous export `Follow` can be an alias or a simplified version if needed.
// For now, we focus on `FollowActivity`.
export const Follow = FollowActivity; // Alias for backward compatibility if needed
export type Follow = FollowActivity;
