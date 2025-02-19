import { z } from "zod";
import { Image } from "./image.js";

export const Person = z.object({
  id: z.string(),
  type: z.literal("Person"),
  following: z.string().url(),
  followers: z.string().url(),
  inbox: z.string().url(),
  outbox: z.string().url(),
  preferredUsername: z.string(),
  name: z.string(),
  summary: z.string().nullish(),
  url: z.string().url(),
  published: z.string(),
  publicKey: z.object({
    id: z.string(),
    owner: z.string(),
    publicKeyPem: z.string(),
  }),
  endpoints: z
    .object({
      sharedInbox: z.string().optional(),
    })
    .optional(),
  icon: Image.optional(),
  image: Image.optional(),
});
export type Person = z.infer<typeof Person>;
