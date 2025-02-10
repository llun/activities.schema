// This schema is base on https://docs.joinmastodon.org/entities/Account/#source
import { z } from "zod";
import { Field } from "./field.js";
import { Visibility } from "../visibility.js";

export const Source = z.object({
  note: z.string({
    description: "Profile bio, in plain-text instead of in HTML",
  }),
  fields: Field.array().describe("Metadata about the account"),
  privacy: Visibility.describe(
    "The default post privacy to be used for new statuses."
  ),
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
