import { userSchema } from "../schemas/user.schema"

export const usersEndpoints = {
  "/api/users/me": {
    get: {
      summary: "Get my profile",
      description: "Get authenticated user profile with statistics",
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "User profile",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    ...userSchema,
                    properties: {
                      ...userSchema.properties,
                      balance: {
                        type: "object",
                        properties: {
                          amount: { type: "number" },
                        },
                      },
                      _count: {
                        type: "object",
                        properties: {
                          bookCopies: { type: "integer" },
                          listings: { type: "integer" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "401": { description: "Unauthorized" },
      },
    },
    patch: {
      summary: "Update my profile",
      description: "Update authenticated user profile",
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "John Doe" },
                bio: { type: "string", example: "Book lover from Kyiv" },
                location: { type: "string", example: "Kyiv, Ukraine" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Profile updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: userSchema,
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
