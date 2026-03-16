import BigNumber from "bignumber.js";

export function isNumberAndGreaterThanZero(value: string): boolean {
  return !BigNumber(value).isNaN() && BigNumber(value).isGreaterThan(0);
}
