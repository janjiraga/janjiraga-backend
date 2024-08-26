import { nanoid } from "nanoid";

// Utility function to format name into slug-friendly format
function slugify(name: string): string {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single one
    .trim(); // Trim leading/trailing hyphens
}

// Function to generate a combined slug
export function generateSlug(name: string): string {
  const formattedName = slugify(name);
  const uniqueId = nanoid(6); // Generate a shorter nanoid (e.g., 6 characters)
  return `${formattedName}-${uniqueId}`;
}
