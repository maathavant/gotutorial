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
  // Check if token is a string
  if (typeof token !== 'string') {
    throw new Error('Token must be a string');
  }

  // Check if secret is a string
  if (typeof secret !== 'string') {
    throw new Error('Secret must be a string');
  }

  // Validate token
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, claims) => {
      if (err) {
        // If token is invalid or expired, throw an error
        reject(new Error(`Invalid token: ${err.message}`));
      } else {
        // If token is valid, resolve with claims
        resolve(claims);
      }
    });
  });
}

// Example usage:
// const token = 'your-jwt-token';
// const secret = 'your-secret-key';
// const options = { ignoreExpiration: true };
// validateToken(token, secret, options)
//   .then((claims) => console.log(claims))
//   .catch((err) => console.error(err));