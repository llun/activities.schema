import { z } from "zod";
import { BaseMedia } from "./baseMedia.js"; // Import the new base

export const DocumentType = z.literal("Document");

// Document can also be a type of media, but often more generic or non-visual.
// It can still benefit from some BaseMedia properties.
export const Document = BaseMedia.extend({
  type: DocumentType,
  // Override or ensure properties from BaseMedia are appropriate
  // For a generic Document, width, height, focalPoint, blurhash might be less common
  // but are kept if it could represent a visual document.
  // If Document is strictly non-visual, these could be omitted or made undefined.
  // For now, inheriting them as optional is fine.
});

export type Document = z.infer<typeof Document>;
