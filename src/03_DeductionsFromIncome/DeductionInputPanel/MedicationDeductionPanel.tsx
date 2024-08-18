import { CurrencyForm } from "../../component/CurrencyForm";
import { Deduction } from "../DeductionsFromIncome";
import { useEffect, useState } from "react";
import { formatCcy } from "../../utils";

type MedicationDeductionPanelProps = {
  medicationExpensesDeduction: Deduction;
  setMedicationExpensesDeduction: (
    medicationExpenseDeduction: Deduction,
  ) => void;
};

// TODO: 医療費控除の特例＝セルフメディケーション税制に対応する

export const MedicationDeductionPanel = (
  props: MedicationDeductionPanelProps,
) => {
  const [paidMedicationExpense, setPaidMedicationExpense] = useState<number>(0);
  const [compensationFromInsurance, setCompensationFromInsurance] =
    useState<number>(0);

  const medicationExpenseDeductionAmount: number = Math.max(
    0,
    paidMedicationExpense - compensationFromInsurance - 100_000,
    // NOTE: 総所得金額等が200万円未満の場合は、-100000 ではなく総所得金額等の5%を引く
  );
  useEffect(() => {
    props.setMedicationExpensesDeduction({
      forIncomeTax: medicationExpenseDeductionAmount,
      forResidentTax: medicationExpenseDeductionAmount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicationExpenseDeductionAmount]);

  return (
    <>
      支払った医療費の額:
      <CurrencyForm
        value={paidMedicationExpense}
        onChangeValue={setPaidMedicationExpense}
      />
      <br />
      保険金等で補填される金額:
      <CurrencyForm
        value={compensationFromInsurance}
        onChangeValue={setCompensationFromInsurance}
      />
      <br />
      {/*TODO: ここの見せ方・・・どうにかならないか・・・*/}
      医療費控除の金額: (所得税){" "}
      {formatCcy(props.medicationExpensesDeduction.forIncomeTax)}
      (住民税) {formatCcy(props.medicationExpensesDeduction.forResidentTax)}
    </>
  );
};
