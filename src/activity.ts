import { z } from "zod";
import { Actor } from "./actor.js"; // Assuming Actor schema is defined
import { BaseObjectSchema } from "./note/baseContent.js"; // Assuming a base object schema

// A generic reference to an object or link, can be a URI or an embedded object
const ObjectOrLink = z.union([z.string().url(), BaseObjectSchema, Actor]);
const LinkReference = z.string().url(); // For actor, object, target if only expecting URI

export const BaseActivity = z.object({
  "@context": z
    .union([
      z.string().url(),
      z.array(z.union([z.string().url(), z.record(z.string())])),
    ])
    .optional()
    .describe("The JSON-LD context"),
  id: z.string().url().describe("Unique URI for the activity"),
  type: z.string().describe("The type of the activity"), // To be specialized by extending schemas

  actor: ObjectOrLink.describe("The actor performing the activity (URI or Actor object)"),

  object: ObjectOrLink.optional().describe("The object of the activity (URI or AP Object)"),

  target: ObjectOrLink.optional().describe("The target of the activity (URI or AP Object)"),

  published: z.string().datetime({ offset: true }).optional().describe("Publication date of the activity (ISO 8601)"),

  to: z.array(LinkReference).optional().describe("Audience: Primary recipients"),
  cc: z.array(LinkReference).optional().describe("Audience: Copied recipients"),
  bto: z.array(LinkReference).optional().describe("Audience: Blind carbon copy (for C2S)"),
  bcc: z.array(LinkReference).optional().describe("Audience: Blind carbon copy (for C2S)"),

  summary: z.string().optional().describe("A summary of the activity"),
  content: z.string().optional().describe("Content of the activity, if any"),

  // instrument: ObjectOrLink.optional().describe("Tool or instrument used in the activity"),
  // origin: ObjectOrLink.optional().describe("Origin of the activity"),
  // result: ObjectOrLink.optional().describe("Result of the activity"),
});

export type BaseActivity = z.infer<typeof BaseActivity>;
