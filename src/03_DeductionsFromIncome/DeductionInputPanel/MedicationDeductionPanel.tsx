import { CurrencyForm } from "../../component/CurrencyForm";
import { Deduction } from "../DeductionsFromIncome";
import { useState } from "react";

type MedicationDeductionPanelProps = {
  medicationExpensesDeduction: Deduction;
  setMedicationExpenses: (medicationExpenseDeduction: Deduction) => void;
};

export const MedicationDeductionPanel = (
  props: MedicationDeductionPanelProps,
) => {
  // TODO: 医療費控除の特例＝セルフメディケーション税制に対応する
  const [paidMedicationExpense, setPaidMedicationExpense] = useState<number>(0);
  return (
    <>
      医療費:{" "}
      <CurrencyForm
        value={paidMedicationExpense}
        onChangeValue={setPaidMedicationExpense}
      />
    </>
  );
};

// TODO: なんでかわからんけど、無限にレンダリングがされてしまう
