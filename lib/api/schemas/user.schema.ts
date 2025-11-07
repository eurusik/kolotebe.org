export const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    image: { type: "string", format: "uri" },
    bio: { type: "string" },
    location: { type: "string" },
    role: {
      type: "string",
      enum: ["USER", "DEVELOPER", "MODERATOR", "ADMIN"],
    },
  },
}
