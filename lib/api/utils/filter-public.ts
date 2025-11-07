/**
 * Extract only public (read-only) endpoints from OpenAPI spec
 * Public endpoints are GET requests that don't require authentication
 */
export function extractPublicEndpoints(endpoints: Record<string, any>) {
  const publicEndpoints: Record<string, any> = {}

  for (const [path, methods] of Object.entries(endpoints)) {
    const publicMethods: Record<string, any> = {}

    // Only include GET methods for public API
    if (methods.get) {
      publicMethods.get = methods.get
    }

    // Only add path if it has public methods
    if (Object.keys(publicMethods).length > 0) {
      publicEndpoints[path] = publicMethods
    }
  }

  return publicEndpoints
}
