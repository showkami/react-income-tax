import { CurrencyForm } from "../../component/CurrencyForm";
import { useDeduction } from "../../TaxLogic/03_deductionsFromIncome";

export const MedicalDeductionPanel = () => {
  const {
    paidMedicalExpenses,
    setPaidMedicalExpenses,
    compensatedMedicalExpenses,
    setCompensatedMedicalExpenses,
  } = useDeduction();
  return (
    <>
      支払った医療費の額:
      <CurrencyForm
        value={paidMedicalExpenses}
        onChangeValue={setPaidMedicalExpenses}
      />
      <br />
      保険金等で補填される金額:
      <CurrencyForm
        value={compensatedMedicalExpenses}
        onChangeValue={setCompensatedMedicalExpenses}
      />
    </>
  );
};
