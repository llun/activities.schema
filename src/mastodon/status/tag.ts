// This schema is base on https://docs.joinmastodon.org/entities/Status/#Tag
import { z } from "zod";

export const Tag = z.object({
  name: z.string({
    description: "The value of the hashtag after the `#` sign",
  }),
  url: z.string({
    description: "A link to the hashtag on the instance",
  }),
});
export type Tag = z.infer<typeof Tag>;
