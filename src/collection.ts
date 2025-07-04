import { z } from "zod";

// Define a generic item type for collections.
// Can be a URL string or any Zod schema (e.g., Actor, Note, LikeActivity).
const ItemSchema = z.union([z.string().url(), z.any()]); // z.any() will be replaced by a generic in the functions

export const CollectionType = z.union([
  z.literal("Collection"),
  z.literal("OrderedCollection"),
]);
export type CollectionType = z.infer<typeof CollectionType>;

export const CollectionPageType = z.union([
  z.literal("CollectionPage"),
  z.literal("OrderedCollectionPage"),
]);
export type CollectionPageType = z.infer<typeof CollectionPageType>;

// Generic function to create a CollectionPage schema for a given item type
export function createCollectionPageSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    "@context": z.union([z.string().url(), z.array(z.union([z.string().url(), z.record(z.string())]))]).optional(),
    id: z.string().url().optional().describe("Unique URI for the collection page"), // Page ID is optional
    type: CollectionPageType,
    partOf: z.string().url().optional().describe("URI of the collection this page belongs to"), // Optional as per AP spec
    next: z.string().url().optional().describe("URI of the next page in the collection"),
    prev: z.string().url().optional().describe("URI of the previous page in the collection"),
    items: z.array(itemSchema).optional().describe("The items contained in this page"),
    // Other properties like totalItems can also be on a page
    totalItems: z.number().int().nonnegative().optional().describe("Total items in the collection (can also be on the page)"),
    current: z.string().url().optional().describe("Link to this page (self-reference)"),
    first: z.string().url().optional().describe("Link to the first page (if different from current)"),
    last: z.string().url().optional().describe("Link to the last page"),
  });
}

// Generic function to create a Collection schema for a given item type
export function createCollectionSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  const collectionPageSchema = createCollectionPageSchema(itemSchema);

  return z.object({
    "@context": z.union([z.string().url(), z.array(z.union([z.string().url(), z.record(z.string())]))]).optional(),
    id: z.string().url().describe("Unique URI for the collection"),
    type: CollectionType,
    totalItems: z.number().int().nonnegative().optional().describe("Total number of items in the collection"),

    // Direct items (for non-paginated or embedded collections)
    items: z.array(itemSchema).optional().describe("Items in the collection if not paginated or if first page is embedded"),

    // For paginated collections
    first: z.union([z.string().url(), collectionPageSchema]).optional().describe("The first page of items or a link to it"),
    last: z.string().url().optional().describe("The last page of items or a link to it"),
    current: z.string().url().optional().describe("A link to the current page (if collection itself represents a page)"),

    // Other possible properties
    name: z.string().optional().describe("A name for the collection"),
    summary: z.string().optional().describe("A summary of the collection"),
  });
}

// Example of a generic Collection (can hold any item type if not specified)
export const BaseCollection = createCollectionSchema(ItemSchema);
export type BaseCollection = z.infer<typeof BaseCollection>;

// Example of a generic CollectionPage
export const BaseCollectionPage = createCollectionPageSchema(ItemSchema);
export type BaseCollectionPage = z.infer<typeof BaseCollectionPage>;


// --- Pre-generic version for reference or simpler use cases ---
// This is what was present before making it generic. Kept for context if needed.
// export const OldCollectionWithFirstPage = z.object({
//   id: z.string().url(),
//   type: CollectionType,
//   first: createCollectionPageSchema(z.any()), // Page of any items
// });
// export type OldCollectionWithFirstPage = z.infer<typeof OldCollectionWithFirstPage>;

// export const OldCollectionWithItems = z.object({
//   id: z.string().url(),
//   type: CollectionType,
//   totalItems: z.number().int().nonnegative(),
//   items: z.array(z.any()),
// });
// export type OldCollectionWithItems = z.infer<typeof OldCollectionWithItems>;

// export const OldCollection = z.union([
//   OldCollectionWithFirstPage,
//   OldCollectionWithItems,
// ]);
// export type OldCollection = z.infer<typeof OldCollection>;


// For direct use in BaseObjectSchema where it was Collection or CollectionWithItems
export const Collection = BaseCollection; // Alias for now
export type Collection = BaseCollection;

// If CollectionWithItems was specifically used for its structure (id, type, totalItems, items array)
export const CollectionWithItems = createCollectionSchema(ItemSchema).pick({
  id: true,
  type: true,
  totalItems: true,
  items: true,
  "@context": true,
});
export type CollectionWithItems = z.infer<typeof CollectionWithItems>;
