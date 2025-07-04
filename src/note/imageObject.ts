import { z } from "zod";
import { BaseMedia } from "./baseMedia.js";

export const ImageObjectType = z.literal("Image");

export const ImageObject = BaseMedia.extend({
  type: ImageObjectType,
});

export type ImageObject = z.infer<typeof ImageObject>;
