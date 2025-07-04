import { z } from "zod";
import { CollectionWithItems } from "../collection.js"; // For replies.totalItems

// Represents an option within a Question (Poll) object.
// As per ActivityStreams Vocabulary §5.4 and Mastodon's implementation,
// these are typically represented as Note objects.
export const PollOption = z.object({
  // id: z.string().url().optional().describe("Unique URI for the poll option, if it has one"), // Not always present in Mastodon's examples
  type: z.literal("Note").describe("The type of the poll option, typically Note"),
  name: z.string().describe("The text content of the poll option"),

  // Mastodon uses replies.totalItems to represent the vote count for this option.
  // In pure ActivityStreams, this might be a collection of activities (e.g., Create activities whose object is this option).
  replies: CollectionWithItems.extend({ // Make sure CollectionWithItems has totalItems
    items: z.undefined().optional(), // Votes are usually not itemized directly on the poll option in this context
  }).optional().describe("A collection representing votes for this option. totalItems indicates the vote count."),

  // Potentially, an option could have its own attachments or tags, though uncommon for polls.
  // attachment: z.array(Attachment).optional(),
  // tag: z.array(Tag).optional(),
});

export type PollOption = z.infer<typeof PollOption>;
