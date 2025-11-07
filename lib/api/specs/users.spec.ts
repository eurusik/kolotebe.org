import { userSchema } from "../schemas/user.schema"

export const usersEndpoints = {
  "/api/users/me": {
    get: {
      summary: "Get my profile",
      description: `Get your profile information with statistics.
      
**What you get:**
- Personal info (name, email, bio, location)
- Kolocoin balance
- Statistics:
  - Total books in your library
  - Active listings count

**Use cases:**
- Display user profile page
- Check Kolocoin balance
- Show library statistics

**Authentication required:** You must be logged in`,
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Your profile with statistics",
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
                          amount: { 
                            type: "number",
                            description: "Your Kolocoin balance" 
                          },
                        },
                      },
                      _count: {
                        type: "object",
                        properties: {
                          bookCopies: { 
                            type: "integer",
                            description: "Total books in your library" 
                          },
                          listings: { 
                            type: "integer",
                            description: "Active listings count" 
                          },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                user: {
                  id: "user123",
                  name: "John Doe",
                  email: "john@example.com",
                  bio: "Book lover from Kyiv",
                  location: "Kyiv, Ukraine",
                  balance: {
                    amount: 15,
                  },
                  _count: {
                    bookCopies: 25,
                    listings: 10,
                  },
                },
              },
            },
          },
        },
        "401": { 
          description: "Unauthorized - you must be logged in" 
        },
      },
    },
    patch: {
      summary: "Update my profile",
      description: `Update your profile information.
      
**What you can update:**
- name: Your display name
- bio: Short biography or description
- location: City/country (e.g., "Kyiv, Ukraine")

**What you CANNOT update:**
- email (contact support)
- balance (earned through exchanges)
- role (set by admin)

**Tips:**
- All fields are optional - update only what you want
- Bio helps build trust in the community
- Location helps with self-pickup arrangements`,
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { 
                  type: "string", 
                  example: "John Doe",
                  description: "Your display name (visible to others)" 
                },
                bio: { 
                  type: "string", 
                  example: "Book lover from Kyiv. Love sci-fi and classics!",
                  description: "Short bio about yourself and reading preferences" 
                },
                location: { 
                  type: "string", 
                  example: "Kyiv, Ukraine",
                  description: "Your city/country (helps with meetups)" 
                },
              },
            },
            example: {
              name: "John Doe",
              bio: "Passionate reader from Kyiv. Mostly into fantasy and sci-fi.",
              location: "Kyiv, Shevchenko district",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Profile updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: userSchema,
                },
              },
              example: {
                user: {
                  id: "user123",
                  name: "John Doe",
                  email: "john@example.com",
                  bio: "Passionate reader from Kyiv",
                  location: "Kyiv, Shevchenko district",
                },
              },
            },
          },
        },
        "401": { 
          description: "Unauthorized - you must be logged in" 
        },
      },
    },
  },
}
