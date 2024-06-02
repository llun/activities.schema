// This schema is base on https://docs.joinmastodon.org/entities/Filter/
import { z } from "zod";
import { FilterKeyword } from "./keyword.js";
import { FilterStatus } from "./status.js";

export const Filter = z.object({
  id: z.string({ description: "The ID of the Filter in the database" }),
  title: z.string({
    description: "A title given by the user to name the filter",
  }),
  context: z
    .enum(["home", "notifications", "public", "thread", "account"])
    .array()
    .describe("The contexts in which the filter should be applied"),
  expires_at: z
    .string({
      description:
        "When the filter should no longer be applied in ISO 8601 Datetime format or null if the filter does not expire",
    })
    .nullable(),
  filter_action: z
    .enum(["warn", "hide"])
    .describe("The action to be taken when a status matches this filter"),
  keywords: FilterKeyword.array().describe(
    "The keywords grouped under this filter"
  ),
  statuses: FilterStatus.array().describe(
    "The statuses grouped under this filter"
  ),
});
export type Filter = z.infer<typeof Filter>;
