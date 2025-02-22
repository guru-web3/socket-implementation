import BigNumber from "bignumber.js";

export const convertToDecimals = (value: string, decimals: number) => {
  return new BigNumber(value)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toNumber();
};
export const roundToTwoDecimals = (num: string | number) => {
  if (typeof num === "string") {
    num = parseFloat(num);
    return Math.round(num * 100) / 100;
  }
  return Math.round(num * 100) / 100;
};
