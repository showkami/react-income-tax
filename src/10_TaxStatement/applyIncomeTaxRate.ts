type Data = {
  minTaxableAmount?: number;
  maxTaxableAmount?: number;
  coefficient: number;
  constant: number;
};

const data: Data[] = [
  {
    maxTaxableAmount: 1_950_000,
    coefficient: 0.05,
    constant: 0,
  },
  {
    minTaxableAmount: 1_950_000,
    maxTaxableAmount: 3_300_000,
    coefficient: 0.1,
    constant: -97_500,
  },
  {
    minTaxableAmount: 3_300_000,
    maxTaxableAmount: 6_950_000,
    coefficient: 0.2,
    constant: -427_500,
  },
  {
    minTaxableAmount: 6_950_000,
    maxTaxableAmount: 9_000_000,
    coefficient: 0.23,
    constant: -636_000,
  },
  {
    minTaxableAmount: 9_000_000,
    maxTaxableAmount: 18_000_000,
    coefficient: 0.33,
    constant: -1_536_000,
  },
  {
    minTaxableAmount: 18_000_000,
    maxTaxableAmount: 40_000_000,
    coefficient: 0.4,
    constant: -2_796_000,
  },
  {
    minTaxableAmount: 40_000_000,
    coefficient: 0.45,
    constant: -4_796_000,
  },
];

/**
 * 課税所得金額を受け取って、税率適用後の所得税額を返す
 * @param taxableAmount
 */
export const applyIncomeTaxRate = (taxableAmount: number) => {
  for (let range of data) {
    if (
      (range.minTaxableAmount === undefined ||
        range.minTaxableAmount <= taxableAmount) &&
      (range.maxTaxableAmount === undefined ||
        taxableAmount < range.maxTaxableAmount)
    ) {
      return range.coefficient * taxableAmount + range.constant;
    }
  }
  throw new Error(`指定範囲外: ${taxableAmount}`);
};

export const getIncomeTaxRate = (taxableAmount: number) => {
  for (let range of data) {
    if (
      (range.minTaxableAmount === undefined ||
        range.minTaxableAmount <= taxableAmount) &&
      (range.maxTaxableAmount === undefined ||
        taxableAmount < range.maxTaxableAmount)
    ) {
      return range.coefficient;
    }
  }
  throw new Error(`指定範囲外: ${taxableAmount}`);
};
