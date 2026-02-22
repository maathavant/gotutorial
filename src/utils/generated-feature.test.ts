import { expect } from 'expect';
import { describe, it, beforeAll, afterAll } from 'jest';
import { validateToken } from './token-validator';

describe('validateToken function', () => {
  let token: string;
  let secret: string;
  let options: jwt.VerifyOptions;

  beforeAll(() => {
    token = 'your-jwt-token';
    secret = 'your-secret-key';
    options = { audience: 'your-audience' };
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should validate a valid token', async () => {
    const decoded = await validateToken(token, secret, options);
    expect(decoded).toHaveProperty('audience', options.audience);
  });

  it('should throw an error if the token is invalid', async () => {
    try {
      await validateToken('invalid-token', secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidTokenError);
    }
  });

  it('should throw an error if the token has expired', async () => {
    const expiredToken = jwt.sign({}, secret, { expiresIn: '1s' });
    try {
      await validateToken(expiredToken, secret, options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toBe('Token has expired');
    }
  });

  it('should throw an error if the secret is invalid', async () => {
    try {
      await validateToken(token, 'invalid-secret', options);
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidTokenError);
    }
  });

  it('should throw an error if the options are invalid', async () => {
    try {
      await validateToken(token, secret, { invalidOption: true });
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});