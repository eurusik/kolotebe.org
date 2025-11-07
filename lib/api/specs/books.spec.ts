import { bookSchema, bookCopySchema } from "../schemas/book.schema"

export const booksEndpoints = {
  "/api/books": {
    get: {
      summary: "Search books",
      description: "Search for books by title, author, or ISBN",
      tags: ["Books"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "Search query for book title, author, or ISBN",
          required: false,
          schema: { type: "string", example: "George Orwell" },
        },
      ],
      responses: {
        "200": {
          description: "List of books matching search criteria",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  books: {
                    type: "array",
                    items: bookSchema,
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new book",
      description: "Add a new book to the database",
      tags: ["Books"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "author"],
              properties: {
                title: { type: "string", example: "1984" },
                author: { type: "string", example: "George Orwell" },
                isbn: { type: "string", example: "978-0451524935" },
                genre: { type: "string", example: "Fiction" },
                publicationYear: { type: "integer", example: 1949 },
                coverImage: { type: "string", format: "uri" },
                description: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Book created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  book: bookSchema,
                  bookCopy: bookCopySchema,
                },
              },
            },
          },
        },
        "400": { description: "Bad request - validation error" },
        "401": { description: "Unauthorized - authentication required" },
      },
    },
  },
  "/api/books/{id}": {
    get: {
      summary: "Get book by ID",
      description: "Retrieve a single book with all its copies and listings",
      tags: ["Books"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Book ID",
        },
      ],
      responses: {
        "200": {
          description: "Book details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  book: {
                    ...bookSchema,
                    properties: {
                      ...bookSchema.properties,
                      copies: {
                        type: "array",
                        items: bookCopySchema,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": { description: "Book not found" },
      },
    },
  },
  "/api/book-copies": {
    get: {
      summary: "Get my book copies",
      description: "Get all book copies owned by the authenticated user",
      tags: ["Books"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "List of user's book copies",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  bookCopies: {
                    type: "array",
                    items: bookCopySchema,
                  },
                },
              },
            },
          },
        },
        "401": { description: "Unauthorized" },
      },
    },
  },
}
