export const publicApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Kolotebe Public API",
    version: "1.0.0",
    description: `
# Kolotebe Public API

Welcome to the Kolotebe Public API - read-only access to our book sharing platform.

## Features
- Browse books from our community library
- Search available listings
- View book details and availability
- No authentication required for read operations

## Available Operations

This public API provides read-only access to browse books and listings. 
For full API access including creation and modification operations, contact our developer team.

## Support

For questions or partnership inquiries: support@kolotebe.org
    `,
    contact: {
      name: "Kolotebe Support",
      email: "support@kolotebe.org",
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
      description: "Browse and search books in the library",
    },
    {
      name: "Listings",
      description: "View available book listings",
    },
  ],
  paths: {
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
            description: "List of matching books",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    books: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "clh1234567890" },
                          title: { type: "string", example: "1984" },
                          author: { type: "string", example: "George Orwell" },
                          isbn: { type: "string", example: "978-0451524935" },
                          genre: { type: "string", example: "Fiction" },
                          publicationYear: { type: "integer", example: 1949 },
                          description: { type: "string" },
                          coverImage: { type: "string", format: "uri" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "Failed to search books" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/listings": {
      get: {
        summary: "Get available listings",
        description: "Retrieve all active book listings available for sharing",
        tags: ["Listings"],
        responses: {
          "200": {
            description: "List of active listings",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    listings: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          slug: { type: "string" },
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
                          book: {
                            type: "object",
                            properties: {
                              title: { type: "string" },
                              author: { type: "string" },
                              coverImage: { type: "string" },
                            },
                          },
                          owner: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              image: { type: "string" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
