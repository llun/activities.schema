// This schema is base on https://docs.joinmastodon.org/entities/Account/
import { z } from "zod";
import { AccountField } from "./accountField.js";
import { CustomEmoji } from "./customEmoji.js";

const BaseAccount = z.object({
  id: z.string({
    description:
      "This is actor id, for Mastodon, it is a string that case from number but in Activities.next, this is URI",
  }),
  username: z.string({
    description: "The username of the actor, not including domain",
  }),
  acct: z.string({
    description:
      "The Webfinger actor URI. Equal to username for local users, or username@domain for remote users",
  }),
  url: z.string({
    description: "The location of the user's profile page",
  }),
  display_name: z.string({
    description: "The profile's display name",
  }),
  note: z.string({
    description: "The profile's bio or description",
  }),
  avatar: z.string({
    description:
      "An image URL icon that is shown next to statuses and in the profile",
  }),
  avatar_static: z.string({
    description:
      "A static version of the `avatar`. Equal to `avatar` if its value is a static image; different if `avatar` is an animated GIF",
  }),
  header: z.string({
    description:
      "An image banner URL that is shown above the profile and in profile cards.",
  }),
  header_static: z.string({
    description:
      "A static version of the `header`. Equal to `header` if its value is a static image; different if `header` is an animated GIF",
  }),
  locked: z.boolean({
    description: "Whether the actor manually approves follow requests",
  }),
  fields: AccountField.array().describe(
    "Additional metadata attached to a profile as name-value pairs"
  ),
  emojis: CustomEmoji.array().describe(
    "Custom emoji entities to be used when rendering the profile"
  ),
  bot: z.boolean({
    description:
      "Indicates that the actor may perform automated actions, may not be monitored, or identifies as a robot",
  }),
  group: z.boolean({
    description: "Indicates that the actor represents a Group actor",
  }),
  discoverable: z
    .boolean({
      description:
        "Whether the actor has opted into discovery features such as the profile directory",
    })
    .nullable(),
  noindex: z
    .boolean({
      description:
        "Whether the local user has opted out of being indexed by search engines",
    })
    .nullish(),
  suspended: z
    .boolean({
      description:
        "An extra attribute returned only when an actor is suspended",
    })
    .optional(),
  limited: z
    .boolean({
      description:
        "An extra attribute returned only when an actor is silenced. If true, indicates that the actor should be hidden behind a warning screen.",
    })
    .optional(),

  created_at: z.string({
    description: "The time the actor was created in ISO 8601 Datetime format",
  }),
  last_status_at: z
    .string({
      description:
        "The time when the most recent status was posted in ISO 8601 Datetime format",
    })
    .nullable(),

  statuses_count: z.number({
    description: "How many statuses are attached to this actor",
  }),
  followers_count: z.number({
    description: "The reported followers of this profile",
  }),
  following_count: z.number({
    description: "The reported follows of this profile",
  }),
});
type BaseAccount = z.infer<typeof BaseAccount>;

export const Account = BaseAccount.extend({
  moved: BaseAccount.nullish().describe(
    "Indicates that the profile is currently inactive and that its user has moved to a new account"
  ),
});
export type Account = z.infer<typeof Account>;
