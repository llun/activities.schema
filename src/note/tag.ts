import { z } from "zod";
import { Emoji } from "./emoji.js";
import { Mention } from "./mention.js";
import { HashTag } from "./hashtag.js";

export const Tag = z.union([Mention, Emoji, HashTag]);
export type Tag = z.infer<typeof Tag>;
