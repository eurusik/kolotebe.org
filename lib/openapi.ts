export const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Kolotebe API",
    version: "1.0.0",
    description: `
# Kolotebe Book Sharing Platform API

Welcome to the Kolotebe API - a platform for sharing books via free giveaways, Kolocoins (virtual currency), direct trades, or temporary loans.

## Features
- Browse and search books from our community library
- Share books for free, trade, loan, or exchange using Kolocoins
- Virtual currency system (Kolocoins - KLC) - earn 1 KLC for every book you share
- Multiple delivery methods (Self-pickup, Nova Poshta, Ukrposhta)
- Secure authentication with email or OAuth

## Transfer Types
- **FREE** - Give away books to the community
- **FOR_KOLOCOINS** - Exchange books using KLC virtual currency
- **TRADE** - Direct book-for-book exchange
- **LOAN** - Temporary book lending with return date

## Authentication

Most endpoints require authentication. Use NextAuth.js session cookies or provide authentication headers.

## Rate Limiting

API requests are rate-limited to ensure fair usage:
- **Public endpoints**: 100 requests per minute
- **Authenticated endpoints**: 1000 requests per minute

## Support

For questions or issues, please contact: support@kolotebe.org
    `,
    contact: {
      name: "Kolotebe Support",
      email: "support@kolotebe.org",
      url: "https://kolotebe.org",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      description: "Production API Server",
    },
    {
      url: "http://localhost:3000",
      description: "Local Development Server",
    },
  ],
  tags: [
    {
      name: "Books",
      description: "Operations for managing books in the library",
    },
    {
      name: "Listings",
      description: "Create and manage book listings for sharing",
    },
    {
      name: "Upload",
      description: "File upload operations for images",
    },
    {
      name: "Authentication",
      description: "User authentication and registration",
    },
  ],
  paths: {
    "/api/books": {
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
                    id: { type: "string" },
                    title: { type: "string" },
                    author: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request - validation error",
          },
          "401": {
            description: "Unauthorized - authentication required",
          },
        },
      },
    },
    "/api/listings": {
      post: {
        summary: "Create a new listing",
        description: "Create a listing for a book copy",
        tags: ["Listings"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["bookCopyId", "transferTypes", "deliveryMethods"],
                properties: {
                  bookCopyId: { type: "string" },
                  description: { type: "string" },
                  photos: {
                    type: "array",
                    items: { type: "string", format: "uri" },
                  },
                  transferTypes: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: ["FREE", "FOR_KOLOCOINS", "TRADE", "LOAN"],
                    },
                    example: ["FREE", "FOR_KOLOCOINS"],
                  },
                  deliveryMethods: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: ["SELF_PICKUP", "NOVA_POSHTA", "UKRPOSHTA"],
                    },
                    example: ["SELF_PICKUP", "NOVA_POSHTA"],
                  },
                  pickupLocation: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Listing created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    slug: { type: "string" },
                    status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
          },
          "401": {
            description: "Unauthorized",
          },
        },
      },
    },
    "/api/upload": {
      post: {
        summary: "Upload an image",
        description: "Upload book cover or listing photos",
        tags: ["Upload"],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["file"],
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "File uploaded successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: { type: "string", format: "uri" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request - invalid file",
          },
          "401": {
            description: "Unauthorized",
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        summary: "Register a new user",
        description: "Create a new user account with email and password",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password", "name"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                  password: {
                    type: "string",
                    minLength: 6,
                    example: "password123",
                  },
                  name: { type: "string", example: "John Doe" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User registered successfully",
          },
          "400": {
            description: "Bad request - user already exists",
          },
        },
      },
    },
    "/api/auth/check-user": {
      get: {
        summary: "Check if user exists",
        description: "Check if a user exists by email",
        tags: ["Authentication"],
        parameters: [
          {
            name: "email",
            in: "query",
            required: true,
            schema: {
              type: "string",
              format: "email",
            },
          },
        ],
        responses: {
          "200": {
            description: "User existence check result",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    exists: { type: "boolean" },
                    hasPassword: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Book: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          author: { type: "string" },
          isbn: { type: "string", nullable: true },
          genre: { type: "string", nullable: true },
          publicationYear: { type: "integer", nullable: true },
          coverImage: { type: "string", format: "uri", nullable: true },
          description: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Listing: {
        type: "object",
        properties: {
          id: { type: "string" },
          slug: { type: "string" },
          status: { type: "string", enum: ["ACTIVE", "INACTIVE", "COMPLETED"] },
          description: { type: "string", nullable: true },
          photos: { type: "array", items: { type: "string" } },
          transferTypes: {
            type: "array",
            items: {
              type: "string",
              enum: ["FREE", "FOR_KOLOCOINS", "TRADE", "LOAN"],
            },
          },
          deliveryMethods: {
            type: "array",
            items: {
              type: "string",
              enum: ["SELF_PICKUP", "NOVA_POSHTA", "UKRPOSHTA"],
            },
          },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
}
