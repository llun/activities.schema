import { z } from "zod";
import { Emoji } from "./emoji.js";
import { Mention } from "./mention.js";

export const Tag = z.union([Mention, Emoji]);
export type Tag = z.infer<typeof Tag>;
