// This schema is base on https://docs.joinmastodon.org/entities/Status/#Mention
import { z } from "zod";

export const Mention = z.object({
  id: z.string({ description: "The actor ID of the mentioned user" }),
  username: z.string({ description: "The username of the mentioned user" }),
  url: z.string({
    description: "The location of the mentioned user’s profile",
  }),
  acct: z.string({
    description:
      "The webfinger acct: URI of the mentioned user. Equivalent to `username` for local users, or `username@domain` for remote users",
  }),
});
export type Mention = z.infer<typeof Mention>;
