// Import required libraries
import * as jwt from 'jsonwebtoken';
import { Error } from 'http-errors';

// Define a function to validate JWT tokens
/**
 * Validates a JWT token by checking its signature, expiration, and extracting user claims.
 * 
 * @param token The JWT token to validate
 * @param secret The secret key used to sign the token
 * @param options Optional validation options (e.g., ignoreExpiration)
 * @returns The validated token claims
 * @throws Error if the token is invalid or expired
 */
export function validateToken(
  token: string,
  secret: string,
  options?: jwt.VerifyOptions
): Promise<{ [key: string]: any }> {
  return new Promise((resolve, reject) => {
    try {
      // Attempt to verify the token
      const decoded = jwt.verify(token, secret, options);
      
      // If the token is valid, resolve with the decoded claims
      resolve(decoded);
    } catch (error) {
      // If the token is invalid or expired, reject with an error
      if (error instanceof jwt.TokenExpiredError) {
        reject(new Error('Token has expired', { statusCode: 401 }));
      } else if (error instanceof jwt.JsonWebTokenError) {
        reject(new Error('Invalid token', { statusCode: 401 }));
      } else {
        reject(error);
      }
    }
  });
}

// Example usage:
// const token = 'your-jwt-token';
// const secret = 'your-secret-key';
// validateToken(token, secret)
//   .then((claims) => console.log(claims))
//   .catch((error) => console.error(error));