import { z } from "zod";
import { BaseActivity } from "./activity.js";
import { Actor } from "./actor.js"; // Object of a block is an Actor or its URI

const BlockedObject = z.union([
  Actor,
  z.string().url() // URI of the actor being blocked
]);

export const BlockActivity = BaseActivity.extend({
  type: z.literal("Block"),
  object: BlockedObject.describe("The actor that is being blocked."),
  // Mastodon S2S Block:
  // actor: "https://mastodon.example/users/alice",
  // object: "https://example.com/~mallory",
  // to: "https://example.com/~mallory" (The actor being blocked)
});

export type BlockActivity = z.infer<typeof BlockActivity>;

// Make sure this is imported in undo.ts if used with z.lazy()
// For example, in undo.ts:
// import { BlockActivity } from "./block.js";
// const UndoneActivity = z.union([..., z.lazy(() => BlockActivity), ...]);
// This is now fine as block.ts does not depend on undo.ts
