import { booksEndpoints } from "./specs/books.spec"
import { listingsEndpoints } from "./specs/listings.spec"
import { usersEndpoints } from "./specs/users.spec"
import { authEndpoints } from "./specs/auth.spec"
import { uploadEndpoints } from "./specs/upload.spec"

export const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Kolotebe API",
    version: "1.0.0",
    description: `
# Kolotebe Internal API

Complete API documentation for Kolotebe book sharing platform.

## Authentication

Most endpoints require authentication via NextAuth session.

## Features

- **Books Management** - Add and search books
- **Listings** - Create and manage book exchange listings  
- **User Profile** - Manage your profile and view statistics
- **File Upload** - Upload book covers and photos
- **Filters** - Search by genre, transfer type, delivery method
    `,
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
      name: "Users",
      description: "User profile management",
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
    ...booksEndpoints,
    ...listingsEndpoints,
    ...usersEndpoints,
    ...authEndpoints,
    ...uploadEndpoints,
  },
}
