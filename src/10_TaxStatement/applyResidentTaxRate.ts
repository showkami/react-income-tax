const TAX_RATE = 0.1;

export const applyResidentTaxRate = (taxableAmount: number) => {
  return taxableAmount * TAX_RATE;
};
