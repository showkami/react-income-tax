import { Deduction } from "../DeductionsFromIncome";
import { useEffect, useState } from "react";
import { CurrencyForm } from "../../component/CurrencyForm";

type SocialInsurancePremiumDeductionPanelProps = {
  deduction: Deduction;
  setDeduction: (deduction: Deduction) => void;
};

export const SocialInsurancePremiumDeductionPanel = (
  props: SocialInsurancePremiumDeductionPanelProps,
) => {
  // TODO: 給与明細からのインプットに対応
  const [paidAmount, setPaidAmount] = useState<number>(0);

  useEffect(() => {
    props.setDeduction({
      forIncomeTax: paidAmount,
      forResidentTax: paidAmount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paidAmount]);
  return (
    <>
      支払った金額：
      <CurrencyForm value={paidAmount} onChangeValue={setPaidAmount} />
    </>
  );
};
