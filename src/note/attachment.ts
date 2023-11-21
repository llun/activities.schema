import { z } from "zod";

import { Document } from "./document.js";
import { PropertyValue } from "./propertyValue.js";

export const Attachment = z.union([PropertyValue, Document]);

export type Attachment = z.infer<typeof Attachment>;
