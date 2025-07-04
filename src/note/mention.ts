import { z } from "zod";

export const Mention = z.object({
  type: z.literal("Mention").describe("Indicates that this is a Mention link"),
  href: z.string().url().describe("The URL of the mentioned actor"),
  name: z.string().describe("The textual representation of the mention (e.g., @user@domain)"),
});

export type Mention = z.infer<typeof Mention>;
