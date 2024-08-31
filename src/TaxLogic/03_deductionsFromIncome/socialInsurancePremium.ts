import { useState } from "react";

export const useSocialInsurancePremiumDeduction = () => {
  const [paidSocialInsurancePremium, setPaidSocialInsurancePremium] =
    useState<number>(0);
  const socialInsurancePremiumDeductionAmt = {
    forIncomeTax: paidSocialInsurancePremium,
    forResidentTax: paidSocialInsurancePremium,
  };
  return {
    socialInsurancePremiumDeductionAmt,
    paidSocialInsurancePremium,
    setPaidSocialInsurancePremium,
  };
};
