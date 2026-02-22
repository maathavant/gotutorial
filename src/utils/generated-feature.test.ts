import { expect } from 'expect';
import { validateToken } from './tokenValidator';
import * as jwt from 'jsonwebtoken';
import { Error } from 'http-errors';

describe('validateToken function', () => {
  it('should validate a valid JWT token', async () => {
    const token = 'your-jwt-token';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: true };
    const decoded = await validateToken(token, secret, options);
    expect(decoded).toHaveProperty('iat');
    expect(decoded).toHaveProperty('exp');
  });

  it('should reject an expired JWT token', async () => {
    const token = 'your-jwt-token';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: false };
    try {
      await validateToken(token, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Token has expired');
      expect(error.statusCode).toBe(401);
    }
  });

  it('should reject an invalid JWT token', async () => {
    const token = 'invalid-jwt-token';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: false };
    try {
      await validateToken(token, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid token');
      expect(error.statusCode).toBe(401);
    }
  });

  it('should reject an error that is not a TokenExpiredError or JsonWebTokenError', async () => {
    const token = 'your-jwt-token';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: false };
    const error = new Error('Test error');
    try {
      await validateToken(token, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error');
    }
  });

  it('should reject a null token', async () => {
    const token = null;
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: false };
    try {
      await validateToken(token, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid token');
      expect(error.statusCode).toBe(401);
    }
  });

  it('should reject an empty token', async () => {
    const token = '';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: false };
    try {
      await validateToken(token, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid token');
      expect(error.statusCode).toBe(401);
    }
  });

  it('should reject a token with a null secret', async () => {
    const token = 'your-jwt-token';
    const secret = null;
    const options = { ignoreExpiration: false };
    try {
      await validateToken(token, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid token');
      expect(error.statusCode).toBe(401);
    }
  });

  it('should reject a token with an empty secret', async () => {
    const token = 'your-jwt-token';
    const secret = '';
    const options = { ignoreExpiration: false };
    try {
      await validateToken(token, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid token');
      expect(error.statusCode).toBe(401);
    }
  });
});