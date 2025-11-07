import { bookSchema, bookCopySchema } from "../schemas/book.schema"

export const booksEndpoints = {
  "/api/books": {
    get: {
      summary: "Search books",
      description: `Search for books in the Kolotebe library by title, author, or ISBN.
      
**How it works:**
- Returns books matching your search query
- Search is case-insensitive
- Empty search returns all books
- Books can be added by any user, but duplicates are merged

**Use cases:**
- Search before adding a book to avoid duplicates
- Find books to create listings for
- Browse available titles in the community`,
      tags: ["Books"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "Search query - matches against book title, author name, or ISBN. Leave empty to get all books.",
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
              example: {
                books: [
                  {
                    id: "clh123abc",
                    title: "1984",
                    author: "George Orwell",
                    isbn: "978-0451524935",
                    genre: "Fiction",
                    publicationYear: 1949,
                    coverImage: "https://example.com/cover.jpg",
                    description: "Dystopian novel about totalitarianism",
                  },
                ],
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Add a new book",
      description: `Add a book to the library and create your personal copy.
      
**What happens:**
1. System checks if book exists (by ISBN or title+author)
2. If exists: uses existing Book, creates new BookCopy for you
3. If new: creates both Book and BookCopy
4. Returns bookCopyId - you'll need this to create a listing

**Important:**
- This creates YOUR copy of the book, not a public listing
- To share this book, use the bookCopyId with POST /api/listings
- You can have multiple copies of the same book with different conditions

**Required fields:** title, author
**Optional:** isbn, genre, coverImage, description`,
      tags: ["Books"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "author"],
              properties: {
                title: { 
                  type: "string", 
                  example: "1984",
                  description: "Full book title" 
                },
                author: { 
                  type: "string", 
                  example: "George Orwell",
                  description: "Author's full name" 
                },
                isbn: { 
                  type: "string", 
                  example: "978-0451524935",
                  description: "ISBN-10 or ISBN-13 (optional but recommended)" 
                },
                genre: { 
                  type: "string", 
                  example: "Fiction",
                  description: "Book genre/category" 
                },
                publicationYear: { 
                  type: "integer", 
                  example: 1949,
                  description: "Year the book was published" 
                },
                coverImage: { 
                  type: "string", 
                  format: "uri",
                  description: "URL to book cover image (use POST /api/upload first)" 
                },
                description: { 
                  type: "string",
                  description: "Book synopsis or description" 
                },
              },
            },
            example: {
              title: "1984",
              author: "George Orwell",
              isbn: "978-0451524935",
              genre: "Dystopian Fiction",
              publicationYear: 1949,
              description: "A dystopian social science fiction novel",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Book and book copy created successfully. Save the bookCopyId to create a listing later.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  book: bookSchema,
                  bookCopy: bookCopySchema,
                },
              },
              example: {
                book: {
                  id: "clh123abc",
                  title: "1984",
                  author: "George Orwell",
                },
                bookCopy: {
                  id: "clh456def",
                  bookId: "clh123abc",
                  condition: "GOOD",
                },
              },
            },
          },
        },
        "400": { 
          description: "Bad request - validation error (missing required fields or invalid data)" 
        },
        "401": { 
          description: "Unauthorized - you must be logged in to add books" 
        },
      },
    },
  },
  "/api/books/{id}": {
    get: {
      summary: "Get book details",
      description: `Get detailed information about a specific book, including all user copies and active listings.
      
**What you get:**
- Book information (title, author, cover, etc.)
- All copies of this book owned by different users
- Active listings for each copy

**Use cases:**
- View book details page
- See who owns copies of this book
- Check availability and transfer options`,
      tags: ["Books"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Book ID (starts with 'clh')",
          example: "clh123abc",
        },
      ],
      responses: {
        "200": {
          description: "Book details with all copies and listings",
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
              example: {
                book: {
                  id: "clh123abc",
                  title: "1984",
                  author: "George Orwell",
                  copies: [
                    {
                      id: "clh456def",
                      condition: "LIKE_NEW",
                      owner: {
                        id: "user123",
                        name: "John Doe",
                      },
                      listing: {
                        id: "listing789",
                        status: "ACTIVE",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        "404": { 
          description: "Book not found - invalid ID or book doesn't exist" 
        },
      },
    },
  },
  "/api/book-copies": {
    get: {
      summary: "Get my book copies",
      description: `Get all book copies that YOU own.
      
**What this shows:**
- All books you've added to your library
- Their condition (NEW, LIKE_NEW, GOOD, FAIR, POOR)
- Whether they have active listings
- Books without listings (private collection)

**Why use this:**
- View your personal library
- Get bookCopyId to create a new listing
- Check which books are already listed
- Manage your collection

**Authentication required:** You must be logged in`,
      tags: ["Books"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "List of all your book copies",
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
              example: {
                bookCopies: [
                  {
                    id: "clh456def",
                    condition: "GOOD",
                    book: {
                      id: "clh123abc",
                      title: "1984",
                      author: "George Orwell",
                    },
                    listing: null, // Not listed yet
                  },
                  {
                    id: "clh789ghi",
                    condition: "LIKE_NEW",
                    book: {
                      id: "clh321xyz",
                      title: "Harry Potter",
                      author: "J.K. Rowling",
                    },
                    listing: {
                      id: "listing123",
                      status: "ACTIVE", // Already listed
                    },
                  },
                ],
              },
            },
          },
        },
        "401": { 
          description: "Unauthorized - you must be logged in to view your books" 
        },
      },
    },
  },
}
