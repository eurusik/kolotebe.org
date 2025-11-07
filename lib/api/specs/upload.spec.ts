export const uploadEndpoints = {
  "/api/upload": {
    post: {
      summary: "Upload an image",
      description: "Upload book cover or listing photos",
      tags: ["Upload"],
      security: [{ bearerAuth: [] }],
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
        "400": { description: "Bad request - invalid file" },
        "401": { description: "Unauthorized" },
      },
    },
  },
}
