import { z } from "zod";

const CollectionWithFirstPage = z.object({
  id: z.string(),
  type: z.literal("Collection"),
  first: z.object({
    type: z.literal("CollectionPage"),
    next: z.string(),
    partOf: z.string(),
    items: z.array(z.any()),
  }),
});

const CollectionWithItems = z.object({
  id: z.string(),
  type: z.literal("Collection"),
  totalItems: z.number(),
  items: z.array(z.any()),
});

export const Collection = z.union([
  CollectionWithFirstPage,
  CollectionWithItems,
]);
export type Collection = z.infer<typeof Collection>;
