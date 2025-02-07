// This schema is base on https://docs.joinmastodon.org/entities/Account/#Field
import { z } from "zod";

export const Field = z.object({
  name: z.string({
    description: "The key of a given field’s key-value pair",
  }),
  value: z.string({
    description: "The value associated with the `name` key.",
  }),
  verified_at: z
    .string({
      description:
        'Timestamp of when the server verified a URL value for a rel="me" link in ISO 8601 Date time format',
    })
    .nullable(),
});
export type Field = z.infer<typeof Field>;
