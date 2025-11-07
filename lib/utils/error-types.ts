export enum ErrorType {
  DATABASE = 'DATABASE',
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION = 'VALIDATION',
  GENERIC = 'GENERIC',
}

export function classifyError(error: Error): ErrorType {
  const message = error.message.toLowerCase()
  
  // Database errors
  if (
    message.includes('prisma') ||
    message.includes('database') ||
    message.includes('localhost:5432') ||
    message.includes('connection refused')
  ) {
    return ErrorType.DATABASE
  }
  
  // Network errors
  if (
    message.includes('fetch') ||
    message.includes('network') ||
    message.includes('timeout') ||
    message.includes('econnrefused')
  ) {
    return ErrorType.NETWORK
  }
  
  // Authentication errors
  if (
    message.includes('auth') ||
    message.includes('unauthorized') ||
    message.includes('unauthenticated') ||
    message.includes('session')
  ) {
    return ErrorType.AUTH
  }
  
  // Not found errors
  if (
    message.includes('not found') ||
    message.includes('404')
  ) {
    return ErrorType.NOT_FOUND
  }
  
  // Validation errors
  if (
    message.includes('validation') ||
    message.includes('invalid') ||
    message.includes('required')
  ) {
    return ErrorType.VALIDATION
  }
  
  // Generic error
  return ErrorType.GENERIC
}

export function getErrorTranslationKey(errorType: ErrorType): string {
  switch (errorType) {
    case ErrorType.DATABASE:
      return 'errors.databaseConnectionDesc'
    case ErrorType.NETWORK:
      return 'errors.networkError'
    case ErrorType.AUTH:
      return 'errors.authError'
    case ErrorType.NOT_FOUND:
      return 'errors.notFoundError'
    case ErrorType.VALIDATION:
      return 'errors.validationError'
    case ErrorType.GENERIC:
      return 'errors.genericError'
  }
}
