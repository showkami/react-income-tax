import { CurrencyForm } from "../../component/CurrencyForm";
import { formatCcy } from "../../utils";
import { useIncome } from "../../TaxLogic/01_income";

export const SalaryIncomeInput = () => {
  const { salaryRevenue, setSalaryRevenue, salaryIncome } = useIncome();
  const deductionFromSalary = salaryRevenue - salaryIncome;

  return (
    <>
      <CurrencyForm value={salaryRevenue} onChangeValue={setSalaryRevenue} />
      <br />
      給与所得控除: {formatCcy(deductionFromSalary)}
      <br />
      給与収入: {formatCcy(salaryIncome)}
    </>
  );
};
