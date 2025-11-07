import { listingSchema, createListingRequestSchema } from "../schemas/listing.schema"

export const listingsEndpoints = {
  "/api/listings": {
    get: {
      summary: "Get all active listings",
      description: "Retrieve all active book listings with optional filters",
      tags: ["Listings"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "Search by book title or author",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "genre",
          in: "query",
          description: "Filter by book genre",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "transferType",
          in: "query",
          description: "Filter by transfer type",
          required: false,
          schema: {
            type: "string",
            enum: ["FREE", "FOR_KOLOCOINS", "TRADE", "LOAN"],
          },
        },
        {
          name: "deliveryMethod",
          in: "query",
          description: "Filter by delivery method",
          required: false,
          schema: {
            type: "string",
            enum: ["SELF_PICKUP", "NOVA_POSHTA", "UKRPOSHTA"],
          },
        },
      ],
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
                    items: listingSchema,
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new listing",
      description: "Create a listing for a book copy",
      tags: ["Listings"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: createListingRequestSchema,
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
                  listing: listingSchema,
                },
              },
            },
          },
        },
        "400": { description: "Bad request" },
        "401": { description: "Unauthorized" },
      },
    },
  },
  "/api/listings/{id}": {
    get: {
      summary: "Get listing by ID",
      description: "Retrieve a single listing with full details",
      tags: ["Listings"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Listing ID",
        },
      ],
      responses: {
        "200": {
          description: "Listing details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  listing: listingSchema,
                  isOwner: { type: "boolean" },
                },
              },
            },
          },
        },
        "404": { description: "Listing not found" },
      },
    },
    patch: {
      summary: "Update listing",
      description: "Update your own listing",
      tags: ["Listings"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                description: { type: "string" },
                photos: { type: "array", items: { type: "string" } },
                transferTypes: { type: "array" },
                deliveryMethods: { type: "array" },
                pickupLocation: { type: "string" },
                status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
              },
            },
          },
        },
      },
      responses: {
        "200": { description: "Listing updated" },
        "401": { description: "Unauthorized" },
        "403": { description: "Access denied" },
        "404": { description: "Listing not found" },
      },
    },
    delete: {
      summary: "Delete listing",
      description: "Soft delete your own listing",
      tags: ["Listings"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": { description: "Listing deleted" },
        "401": { description: "Unauthorized" },
        "403": { description: "Access denied" },
        "404": { description: "Listing not found" },
      },
    },
  },
}
