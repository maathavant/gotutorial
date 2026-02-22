// Import required libraries
import * as jwt from 'jsonwebtoken';
import { Error } from 'http-errors';

// Define a custom error class for invalid tokens
class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}

/**
 * Validates a JWT token and extracts user claims.
 * 
 * @param token The JWT token to validate.
 * @param secret The secret key used to sign the token.
 * @param options Optional validation options.
 * @returns The validated token claims.
 * @throws {InvalidTokenError} If the token is invalid.
 */
export function validateToken(
  token: string,
  secret: string,
  options?: jwt.VerifyOptions
): Promise<jwt.JwtPayload> {
  try {
    // Validate the token signature
    const decoded = jwt.verify(token, secret, options);

    // Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
      throw new Error('Token has expired');
    }

    // Return the validated token claims
    return decoded;
  } catch (error) {
    // Check if the error is a JWT error
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new InvalidTokenError('Invalid token');
    } else {
      throw error;
    }
  }
}

// Example usage:
// const token = 'your-jwt-token';
// const secret = 'your-secret-key';
// const options = { audience: 'your-audience' };
// validateToken(token, secret, options)
//   .then((claims) => console.log(claims))
//   .catch((error) => console.error(error));