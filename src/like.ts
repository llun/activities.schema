import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { BaseObjectSchema } from "./note/baseContent.js"; // For Note, Article, etc.
import { Actor } from "./actor.js"; // e.g. liking a profile

// The object of a Like can be any ActivityPub object or a link to one.
const LikedObject = z.union([
  z.string().url(),
  BaseObjectSchema,
  Actor
]);

export const LikeActivity = BaseActivity.extend({
  type: z.literal("Like"),
  object: LikedObject.describe("The object that is being liked."),
});

export type LikeActivity = z.infer<typeof LikeActivity>;

// Alias for backward compatibility or if used as an object in Undo
export const Like = LikeActivity;
export type Like = LikeActivity;
