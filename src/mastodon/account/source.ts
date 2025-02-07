// This schema is base on https://docs.joinmastodon.org/entities/Account/#source
import { z } from "zod";
import { Field } from "./field.js";

export const Source = z.object({
  note: z.string({
    description: "Profile bio, in plain-text instead of in HTML",
  }),
  fields: Field.array().describe("Metadata about the account"),
  privacy: z
    .union([
      z.literal("public").describe("Public post"),
      z.literal("unlisted").describe("Unlisted post"),
      z.literal("private").describe("Followers-only post"),
      z.literal("direct").describe("Direct post"),
    ])
    .describe("The default post privacy to be used for new statuses."),
  sensitive: z.boolean({
    description: "Whether new statuses should be marked sensitive by default",
  }),
  language: z.string({
    description: "The default posting language for new statuses",
  }),
  follow_requests_count: z.number({
    description: "The number of pending follow requests",
  }),
});
export type Source = z.infer<typeof Source>;
