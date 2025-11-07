export const bookSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    author: { type: "string" },
    isbn: { type: "string" },
    genre: { type: "string" },
    publicationYear: { type: "integer" },
    coverImage: { type: "string", format: "uri" },
    description: { type: "string" },
  },
}

export const bookCopySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    bookId: { type: "string" },
    condition: {
      type: "string",
      enum: ["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"],
    },
    notes: { type: "string" },
    book: bookSchema,
  },
}
