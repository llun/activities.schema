import { z } from "zod";

import { Image } from "./image.js";

export const Emoji = z.object({
  type: z.literal("Emoji"),
  name: z.string(),
  updated: z.string(),
  icon: Image,
});

export type Emoji = z.infer<typeof Emoji>;
