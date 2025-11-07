import { booksEndpoints } from "./specs/books.spec"
import { listingsEndpoints } from "./specs/listings.spec"
import { extractPublicEndpoints } from "./utils/filter-public"

export const publicApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Kolotebe Public API",
    version: "1.0.0",
    description: `
# Kolotebe Public API

Welcome to the Kolotebe Public API - read-only access to our book sharing platform.

## Features

- **Browse Books** - Search our community library
- **View Listings** - See available books for exchange
- **Filters** - Search by genre, transfer type, delivery method

## No Authentication Required

All public endpoints are read-only and don't require authentication.
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
      description: "Browse books from our community library",
    },
    {
      name: "Listings",
      description: "View available book listings",
    },
  ],
  paths: {
    ...extractPublicEndpoints(booksEndpoints),
    ...extractPublicEndpoints(listingsEndpoints),
  },
}
