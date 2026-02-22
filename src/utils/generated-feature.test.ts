import { expect } from 'expect';
import { describe, it, beforeAll, afterAll } from 'jest';
import { validateToken, isTokenExpired } from './token-utils';

describe('Token Utilities', () => {
  let token: string;
  let secret: string;

  beforeAll(() => {
    token = 'your-jwt-token';
    secret = 'your-secret-key';
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('validateToken function', () => {
    it('should validate a valid token', async () => {
      const claims = await validateToken(token, secret);
      expect(claims).toHaveProperty('iat');
      expect(claims).toHaveProperty('exp');
      expect(claims).toHaveProperty('sub');
    });

    it('should throw an error for an invalid token', async () => {
      try {
        await validateToken('invalid-token', secret);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('InvalidTokenError');
      }
    });

    it('should throw an error for an expired token', async () => {
      try {
        await validateToken('expired-token', secret);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('InvalidTokenError');
      }
    });

    it('should throw an error for a token with an invalid signature', async () => {
      try {
        await validateToken('invalid-signature-token', secret);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('InvalidTokenError');
      }
    });
  });

  describe('isTokenExpired function', () => {
    it('should return false for a valid token', async () => {
      const expired = await isTokenExpired(token, secret);
      expect(expired).toBe(false);
    });

    it('should return true for an expired token', async () => {
      const expired = await isTokenExpired('expired-token', secret);
      expect(expired).toBe(true);
    });

    it('should return true for an invalid token', async () => {
      const expired = await isTokenExpired('invalid-token', secret);
      expect(expired).toBe(true);
    });

    it('should return true for a token with an invalid signature', async () => {
      const expired = await isTokenExpired('invalid-signature-token', secret);
      expect(expired).toBe(true);
    });
  });
});