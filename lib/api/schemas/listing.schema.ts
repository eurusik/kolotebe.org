export const listingSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    slug: { type: "string" },
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
    },
    deliveryMethods: {
      type: "array",
      items: {
        type: "string",
        enum: ["SELF_PICKUP", "NOVA_POSHTA", "UKRPOSHTA"],
      },
    },
    pickupLocation: { type: "string" },
    status: {
      type: "string",
      enum: ["ACTIVE", "INACTIVE"],
    },
  },
}

export const createListingRequestSchema = {
  type: "object",
  required: ["bookCopyId", "transferTypes", "deliveryMethods"],
  properties: {
    bookCopyId: {
      type: "string",
      description: "ID of the book copy to create listing for",
    },
    description: {
      type: "string",
      description: "Optional description of the listing",
    },
    photos: {
      type: "array",
      items: { type: "string", format: "uri" },
      description: "Array of photo URLs",
    },
    transferTypes: {
      type: "array",
      items: {
        type: "string",
        enum: ["FREE", "FOR_KOLOCOINS", "TRADE", "LOAN"],
      },
      minItems: 1,
      description: "At least one transfer type must be specified",
    },
    deliveryMethods: {
      type: "array",
      items: {
        type: "string",
        enum: ["SELF_PICKUP", "NOVA_POSHTA", "UKRPOSHTA"],
      },
      minItems: 1,
      description: "At least one delivery method must be specified",
    },
    pickupLocation: {
      type: "string",
      description: "Pickup location if SELF_PICKUP is selected",
    },
  },
  example: {
    bookCopyId: "clh1234567890",
    description: "Great condition, almost new",
    photos: [],
    transferTypes: ["FREE", "FOR_KOLOCOINS"],
    deliveryMethods: ["SELF_PICKUP", "NOVA_POSHTA"],
    pickupLocation: "Kyiv, Shevchenko district",
  },
}
