export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text
}

export function generateListingSlug(title: string, author: string, id: string): string {
  const baseSlug = slugify(`${title} ${author}`)
  const shortId = id.slice(-8) // Last 8 characters of ID
  return `${baseSlug}-${shortId}`
}
