import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { BaseObjectSchema } from "./note/baseContent.js"; // Or a more generic object/link type
import { Actor } from "./actor.js";

// The object of an Announce can be an object or a link to an object.
const AnnouncedObject = z.union([
  z.string().url(),
  BaseObjectSchema,
  Actor // e.g. Announcing a profile
]);

export const AnnounceActivity = BaseActivity.extend({
  type: z.literal("Announce"),
  object: AnnouncedObject.describe("The object that is being announced/boosted."),
  // published, to, cc are inherited from BaseActivity
});

export type AnnounceActivity = z.infer<typeof AnnounceActivity>;
