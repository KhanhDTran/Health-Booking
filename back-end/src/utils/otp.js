import { totp } from "otplib";

export function genOtp(secret) {
  totp.options = {
    digits: 6,
    step: 120,
  };
  const token = totp.generate(secret);
  return token;
}

export function verifyOtp(token, secret) {
  totp.options = {
    digits: 6,
    step: 120,
  };
  const isValid = totp.verify({ token, secret });

  return isValid;
}
