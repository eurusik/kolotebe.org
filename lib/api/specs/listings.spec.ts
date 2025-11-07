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
      summary: "Create a listing",
      description: `Create a public listing to share your book with the community.
      
**Before you start:**
1. Add your book via POST /api/books (if not already added)
2. Get your bookCopyId from the response or GET /api/book-copies
3. Use that bookCopyId here to create a listing

**What happens:**
- Your book becomes visible in the public catalog (/api/listings)
- Other users can request to exchange it
- You can set multiple transfer types (FREE, FOR_KOLOCOINS, TRADE, LOAN)
- You can set multiple delivery methods

**Transfer Types explained:**
- FREE: Give away for free
- FOR_KOLOCOINS: Exchange for virtual currency (1 KLC = 1 book)
- TRADE: Book-for-book exchange
- LOAN: Temporary lending (book must be returned)

**Delivery Methods:**
- SELF_PICKUP: Meetup in person (specify pickupLocation)
- NOVA_POSHTA: Ukrainian postal service
- UKRPOSHTA: Ukrainian post office

**Required fields:** bookCopyId, transferTypes (array), deliveryMethods (array)`,
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
