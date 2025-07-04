import { z } from "zod";

import { Document } from "./document.js";
import { PropertyValue } from "./propertyValue.js";
import { ImageObject } from "./imageObject.js";
import { VideoObject } from "./videoObject.js";
import { AudioObject } from "./audioObject.js";

// An attachment can be a media object (Image, Video, Audio, Document)
// or a PropertyValue (used for profile fields, though less common as direct status attachments).
// Link objects could also be attachments, but Mastodon uses PreviewCards for links in status text.
export const Attachment = z.union([
  ImageObject,
  VideoObject,
  AudioObject,
  Document,
  PropertyValue, // Kept for completeness, though less common for status media attachments.
]);

export type Attachment = z.infer<typeof Attachment>;
