import { useState } from "react";
import { plusPart } from "../util";

export const useMedicalExpensesDeduction = () => {
  // TODO: 医療費控除の特例＝セルフメディケーション税制に対応する
  const [paidMedicalExpenses, setPaidMedicalExpenses] = useState<number>(0);
  const [compensatedMedicalExpenses, setCompensatedMedicalExpenses] =
    useState<number>(0);
  const medicalExpensesDeductionAmt = {
    forIncomeTax: plusPart(
      paidMedicalExpenses - compensatedMedicalExpenses - 100_000,
    ),
    forResidentTax: plusPart(
      paidMedicalExpenses - compensatedMedicalExpenses - 100_000,
    ),
    // NOTE: 総所得金額等が200万円未満の場合は、-100000 ではなく総所得金額等の5%を引く
  };
  return {
    medicalExpensesDeductionAmt,
    paidMedicalExpenses,
    setPaidMedicalExpenses,
    compensatedMedicalExpenses,
    setCompensatedMedicalExpenses,
  };
};
