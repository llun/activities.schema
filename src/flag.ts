import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { Actor } from "./actor.js";
import { BaseObjectSchema } from "./note/baseContent.js";

// The object of a Flag can be an Actor, a Note, or other objects, or their URIs.
// Mastodon's example shows an array of URIs (actor and posts).
const FlaggedObject = z.union([
  Actor,
  BaseObjectSchema,
  z.string().url(),
  z.array(z.union([Actor, BaseObjectSchema, z.string().url()])) // Support array of objects/URIs
]);

export const FlagActivity = BaseActivity.extend({
  type: z.literal("Flag"),
  object: FlaggedObject.describe("The object(s) being flagged (e.g., Actor, Note, or an array of these)."),
  content: z.string().optional().describe("The comment or reason for flagging."),
  // Mastodon example for Flag:
  // actor: "https://mastodon.example/actor" (instance actor)
  // content: "Please take a look at this user and their posts"
  // object: [ "https://example.com/users/1", "https://example.com/posts/380590" ]
  // to: "https://example.com/users/1" (the user being reported, or their instance actor)
});

export type FlagActivity = z.infer<typeof FlagActivity>;
