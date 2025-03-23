import { z } from "zod";
import { Image } from "./image.js";

export const Actor = z.object({
  id: z.string(),
  type: z.union([z.literal("Person"), z.literal("Service")]),
  following: z.string().url().optional(),
  followers: z.string().url(),
  inbox: z.string().url(),
  outbox: z.string().url(),
  preferredUsername: z.string(),
  name: z.string(),
  summary: z.string().nullish(),
  url: z.string().url(),
  published: z.string().nullish(),
  manuallyApprovesFollowers: z.boolean().optional(),
  publicKey: z.object({
    id: z.string(),
    owner: z.string(),
    publicKeyPem: z.string(),
  }),
  endpoints: z
    .object({
      sharedInbox: z.string().url().optional(),
    })
    .optional(),
  icon: Image.nullish(),
  image: Image.nullish(),
});
export type Actor = z.infer<typeof Actor>;

export const Person = Actor;
export type Person = z.infer<typeof Person>;

export const Service = Actor;
export type Service = z.infer<typeof Service>;
