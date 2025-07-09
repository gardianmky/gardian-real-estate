// API Error Handler - Unified error handling for ReNet API
import { NextResponse } from 'next/server';

export interface ApiError {
  code: string;
  message: string;
  userMessage: string;
  statusCode: number;
}

export class ReNetApiError extends Error {
  public code: string;
  public userMessage: string;
  public statusCode: number;

  constructor(code: string, message: string, userMessage: string, statusCode: number = 500) {
    super(message);
    this.name = 'ReNetApiError';
    this.code = code;
    this.userMessage = userMessage;
    this.statusCode = statusCode;
  }
}

// Common error types
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  API_CONNECTION_ERROR: 'API_CONNECTION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
} as const;

// User-friendly error messages
export const USER_MESSAGES = {
  [ERROR_CODES.VALIDATION_ERROR]: 'Please check your form details and try again.',
  [ERROR_CODES.API_CONNECTION_ERROR]: 'We\'re experiencing technical difficulties. Please try again in a few minutes.',
  [ERROR_CODES.AUTHENTICATION_ERROR]: 'Authentication failed. Please contact support.',
  [ERROR_CODES.NOT_FOUND]: 'The requested information could not be found.',
  [ERROR_CODES.RATE_LIMIT_ERROR]: 'Too many requests. Please wait a moment and try again.',
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred. Please try again or contact support.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
} as const;

/**
 * Create a standardized error response
 */
export function createErrorResponse(error: ReNetApiError): NextResponse {
  console.error(`[${error.code}] ${error.message}`);
  
  return NextResponse.json(
    {
      error: error.userMessage,
      code: error.code,
      timestamp: new Date().toISOString(),
    },
    { status: error.statusCode }
  );
}

/**
 * Handle API response errors
 */
export async function handleApiResponse(response: Response, context: string): Promise<any> {
  if (!response.ok) {
    let errorMessage = `API request failed: ${response.status}`;
    let userMessage: string = USER_MESSAGES.API_CONNECTION_ERROR;
    let code: string = ERROR_CODES.API_CONNECTION_ERROR;
    
    try {
      const errorData = await response.text();
      if (errorData) {
        errorMessage += ` - ${errorData}`;
      }
    } catch (e) {
      // Ignore parse errors
    }
    
    // Map specific HTTP status codes
    switch (response.status) {
      case 401:
        code = ERROR_CODES.AUTHENTICATION_ERROR;
        userMessage = USER_MESSAGES.AUTHENTICATION_ERROR;
        break;
      case 404:
        code = ERROR_CODES.NOT_FOUND;
        userMessage = USER_MESSAGES.NOT_FOUND;
        break;
      case 429:
        code = ERROR_CODES.RATE_LIMIT_ERROR;
        userMessage = USER_MESSAGES.RATE_LIMIT_ERROR;
        break;
      case 408:
        code = ERROR_CODES.TIMEOUT_ERROR;
        userMessage = USER_MESSAGES.TIMEOUT_ERROR;
        break;
    }
    
    throw new ReNetApiError(code, `${context}: ${errorMessage}`, userMessage, response.status);
  }
  
  try {
    return await response.json();
  } catch (e) {
    throw new ReNetApiError(
      ERROR_CODES.API_CONNECTION_ERROR,
      `${context}: Failed to parse API response`,
      USER_MESSAGES.API_CONNECTION_ERROR,
      502
    );
  }
}

/**
 * Handle validation errors
 */
export function createValidationError(message: string): ReNetApiError {
  return new ReNetApiError(
    ERROR_CODES.VALIDATION_ERROR,
    message,
    USER_MESSAGES.VALIDATION_ERROR,
    400
  );
}

/**
 * Handle fetch errors (network issues, timeouts, etc.)
 */
export function handleFetchError(error: Error, context: string): ReNetApiError {
  console.error(`Fetch error in ${context}:`, error);
  
  // Check for specific error types
  if (error.name === 'AbortError') {
    return new ReNetApiError(
      ERROR_CODES.TIMEOUT_ERROR,
      `${context}: Request timed out`,
      USER_MESSAGES.TIMEOUT_ERROR,
      408
    );
  }
  
  if (error.message?.includes('network') || error.message?.includes('fetch')) {
    return new ReNetApiError(
      ERROR_CODES.API_CONNECTION_ERROR,
      `${context}: Network error - ${error.message}`,
      USER_MESSAGES.API_CONNECTION_ERROR,
      503
    );
  }
  
  return new ReNetApiError(
    ERROR_CODES.INTERNAL_SERVER_ERROR,
    `${context}: ${error.message}`,
    USER_MESSAGES.INTERNAL_SERVER_ERROR,
    500
  );
}

/**
 * Generic error handler for API routes
 */
export function handleGenericError(error: unknown, context: string): NextResponse {
  if (error instanceof ReNetApiError) {
    return createErrorResponse(error);
  }
  
  if (error instanceof Error) {
    const apiError = handleFetchError(error, context);
    return createErrorResponse(apiError);
  }
  
  // Unknown error type
  const genericError = new ReNetApiError(
    ERROR_CODES.INTERNAL_SERVER_ERROR,
    `${context}: Unknown error - ${String(error)}`,
    USER_MESSAGES.INTERNAL_SERVER_ERROR,
    500
  );
  
  return createErrorResponse(genericError);
}