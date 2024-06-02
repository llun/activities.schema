// This schema is base on https://docs.joinmastodon.org/entities/Status/#application
import { z } from "zod";

export const Application = z.object({
  name: z.string({
    description: "The name of the application that posted this status",
  }),
  website: z
    .string({
      description:
        "The website associated with the application that posted this status",
    })
    .nullable(),
});
export type Application = z.infer<typeof Application>;
