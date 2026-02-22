import { expect } from 'expect';
import { validateToken } from './tokenValidator';
import * as jwt from 'jsonwebtoken';

describe('validateToken function', () => {
  it('should validate a valid token', async () => {
    const token = 'your-jwt-token';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: true };
    const claims = await validateToken(token, secret, options);
    expect(claims).toHaveProperty('iat');
    expect(claims).toHaveProperty('exp');
  });

  it('should throw an error for an invalid token', async () => {
    const token = 'invalid-token';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: true };
    await expect(validateToken(token, secret, options)).rejects.toThrowError(
      'Invalid token: jwt must be a string or Buffer'
    );
  });

  it('should throw an error for a token with an invalid signature', async () => {
    const token = 'your-jwt-token';
    const secret = 'wrong-secret-key';
    const options = { ignoreExpiration: true };
    await expect(validateToken(token, secret, options)).rejects.toThrowError(
      'Invalid token: invalid signature'
    );
  });

  it('should throw an error for a token with an expired signature', async () => {
    const token = 'your-jwt-token';
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: false };
    await expect(validateToken(token, secret, options)).rejects.toThrowError(
      'Invalid token: token expired'
    );
  });

  it('should throw an error for a token with a missing secret', async () => {
    const token = 'your-jwt-token';
    const secret = undefined;
    const options = { ignoreExpiration: true };
    await expect(validateToken(token, secret, options)).rejects.toThrowError(
      'Secret must be a string'
    );
  });

  it('should throw an error for a token with a non-string secret', async () => {
    const token = 'your-jwt-token';
    const secret = 123;
    const options = { ignoreExpiration: true };
    await expect(validateToken(token, secret, options)).rejects.toThrowError(
      'Secret must be a string'
    );
  });

  it('should throw an error for a token with a missing token', async () => {
    const token = undefined;
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: true };
    await expect(validateToken(token, secret, options)).rejects.toThrowError(
      'Token must be a string'
    );
  });

  it('should throw an error for a token with a non-string token', async () => {
    const token = 123;
    const secret = 'your-secret-key';
    const options = { ignoreExpiration: true };
    await expect(validateToken(token, secret, options)).rejects.toThrowError(
      'Token must be a string'
    );
  });
});