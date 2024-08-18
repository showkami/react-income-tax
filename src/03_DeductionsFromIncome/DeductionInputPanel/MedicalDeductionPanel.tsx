import { CurrencyForm } from "../../component/CurrencyForm";
import { Deduction } from "../DeductionsFromIncome";
import { useEffect, useState } from "react";
import { formatCcy } from "../../utils";

type MedicalDeductionPanelProps = {
  deduction: Deduction;
  setDeduction: (medicalExpenseDeduction: Deduction) => void;
};

// TODO: 医療費控除の特例＝セルフメディケーション税制に対応する

export const MedicalDeductionPanel = (props: MedicalDeductionPanelProps) => {
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [compensationAmount, setCompensationAmount] = useState<number>(0); // 保険金等からの補填

  const deductionAmount: number = Math.max(
    0,
    paidAmount - compensationAmount - 100_000,
    // NOTE: 総所得金額等が200万円未満の場合は、-100000 ではなく総所得金額等の5%を引く
  );
  useEffect(() => {
    props.setDeduction({
      forIncomeTax: deductionAmount,
      forResidentTax: deductionAmount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deductionAmount]);

  console.log(props.deduction);
  return (
    <>
      支払った医療費の額:
      <CurrencyForm value={paidAmount} onChangeValue={setPaidAmount} />
      <br />
      保険金等で補填される金額:
      <CurrencyForm
        value={compensationAmount}
        onChangeValue={setCompensationAmount}
      />
      <br />
      {/*TODO: ここの見せ方・・・どうにかならないか・・・*/}
      医療費控除の金額: (所得税) {formatCcy(props.deduction.forIncomeTax)}
      (住民税) {formatCcy(props.deduction.forResidentTax)}
    </>
  );
};
