export const authEndpoints = {
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
        "200": { description: "User registered successfully" },
        "400": { description: "Bad request - user already exists" },
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
}
