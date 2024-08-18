import { Deduction } from "../DeductionsFromIncome";
import { useState } from "react";
import { CurrencyForm } from "../../component/CurrencyForm";

type LifeInsurancePremiumDeductionPanelProps = {
  deduction: Deduction;
  setDeduction: (deduction: Deduction) => void;
};

export const LifeInsurancePremiumDeductionPanel = (
  props: LifeInsurancePremiumDeductionPanelProps,
) => {
  const [paidAmountForIppan, setPaidAmountForIppan] = useState<number>(0);
  const [paidAmountForKaigoOrIryo, setPaidAmountForKaigoOrIryo] =
    useState<number>(0);
  const [paidAmountForNenkin, setPaidAmountForNenkin] = useState<number>(0);
  return (
    <>
      <h3>未対応!!!</h3>
      一般の生命保険料に支払った金額:
      <CurrencyForm
        value={paidAmountForIppan}
        onChangeValue={setPaidAmountForIppan}
      />
      <br />
      介護or医療保険料に支払った金額:
      <CurrencyForm
        value={paidAmountForKaigoOrIryo}
        onChangeValue={setPaidAmountForKaigoOrIryo}
      />
      <br />
      個人年金保険料に支払った金額:
      <CurrencyForm
        value={paidAmountForNenkin}
        onChangeValue={setPaidAmountForNenkin}
      />
    </>
  );
};
