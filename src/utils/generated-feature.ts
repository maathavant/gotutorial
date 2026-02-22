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
): Promise<{ [key: string]: any }> {
  return new Promise((resolve, reject) => {
    try {
      // Validate the token signature
      jwt.verify(token, secret, options, (err, claims) => {
        if (err) {
          // If the token is invalid, throw an error
          reject(new InvalidTokenError('Invalid token'));
        } else {
          // If the token is valid, resolve with the claims
          resolve(claims);
        }
      });
    } catch (error) {
      // If an error occurs during validation, reject with the error
      reject(error);
    }
  });
}

/**
 * Checks if a JWT token has expired.
 * 
 * @param token The JWT token to check.
 * @param secret The secret key used to sign the token.
 * @returns True if the token has expired, false otherwise.
 */
export function isTokenExpired(token: string, secret: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      // Validate the token signature
      jwt.verify(token, secret, (err, claims) => {
        if (err) {
          // If the token is invalid, resolve with true
          resolve(true);
        } else {
          // If the token is valid, check if it has expired
          resolve(claims.exp < Math.floor(Date.now() / 1000));
        }
      });
    } catch (error) {
      // If an error occurs during validation, resolve with true
      resolve(true);
    }
  });
}

// Example usage:
// const token = 'your-jwt-token';
// const secret = 'your-secret-key';
// validateToken(token, secret)
//   .then((claims) => console.log(claims))
//   .catch((error) => console.error(error));

// isTokenExpired(token, secret)
//   .then((expired) => console.log(expired))
//   .catch((error) => console.error(error));