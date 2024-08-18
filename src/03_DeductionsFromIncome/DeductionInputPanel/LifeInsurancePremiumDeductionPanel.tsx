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
  // TODO: 新契約のみ or 旧契約のみ or 新旧両方 の3パターンある...
  const [paidAmountForIppanNewCont, setPaidAmountForIppanNewCont] =
    useState<number>(0);
  const [paidAmountForIppanOldCont, setPaidAmountForIppanOldCont] =
    useState<number>(0);
  const [paidAmountForKaigoOrIryoNewCont, setPaidAmountForKaigoOrIryoNewCont] =
    useState<number>(0);
  const [paidAmountForNenkinNewCont, setPaidAmountForNenkinNewCont] =
    useState<number>(0);
  const [paidAmountForNenkinOldCont, setPaidAmountForNenkinOldCont] =
    useState<number>(0);

  return (
    <>
      <h3>未対応!!!</h3>
      一般の生命保険料に支払った金額: （新契約)
      <CurrencyForm
        value={paidAmountForIppanNewCont}
        onChangeValue={setPaidAmountForIppanNewCont}
      />
      (旧契約)
      <CurrencyForm
        value={paidAmountForIppanOldCont}
        onChangeValue={setPaidAmountForIppanOldCont}
      />
      <br />
      介護or医療保険料に支払った金額: (新契約)
      <CurrencyForm
        value={paidAmountForKaigoOrIryoNewCont}
        onChangeValue={setPaidAmountForKaigoOrIryoNewCont}
      />
      <br />
      個人年金保険料に支払った金額: (新契約)
      <CurrencyForm
        value={paidAmountForNenkinNewCont}
        onChangeValue={setPaidAmountForNenkinNewCont}
      />
      (旧契約)
      <CurrencyForm
        value={paidAmountForNenkinOldCont}
        onChangeValue={setPaidAmountForNenkinOldCont}
      />
    </>
  );
};
