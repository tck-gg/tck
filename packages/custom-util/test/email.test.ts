import { isValidEmail } from '../src/util/email';

export const BAD_EMAILS = [
  '',
  'default',
  'default@',
  'default@example',
  '@example.com',
  'example.com',
  '.com'
];

describe('Utility - Email', () => {
  it('validates bad emails correctly', () => {
    BAD_EMAILS.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  it('validates good emails correctly', () => {
    expect(isValidEmail('username@domain.com')).toBe(true);
    expect(isValidEmail('username.last@domain.com')).toBe(true);
  });
});
