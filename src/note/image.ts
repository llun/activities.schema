import { z } from "zod";

export const Image = z.object({
  type: z.literal("Image"),
  mediaType: z.string(),
  url: z.string(),
});

export type Image = z.infer<typeof Image>;
