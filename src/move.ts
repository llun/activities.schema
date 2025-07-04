import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { Actor } from "./actor.js"; // Actor being moved (object) and target actor

// Object is the old actor. Target is the new actor.
const MovedActor = z.union([Actor, z.string().url()]);

export const MoveActivity = BaseActivity.extend({
  type: z.literal("Move"),
  object: MovedActor.describe("The actor that is being moved (the old account)."),
  target: MovedActor.describe("The new actor to which the old account has moved."),
  // Mastodon example for Move:
  // actor: "https://mastodon.example/users/alice" (old actor URI)
  // object: "https://mastodon.example/users/alice" (old actor URI)
  // target: "https://alice.com/users/109835986274379" (new actor URI)
  // to: "https://mastodon.example/users/alice/followers"
});

export type MoveActivity = z.infer<typeof MoveActivity>;
