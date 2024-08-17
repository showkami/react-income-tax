import { useEffect, useState } from "react";

import { CurrencyForm } from "../../component/CurrencyForm";
import { formatCcy } from "../../utils";

/**
 * 給与所得控除の金額の計算
 * @param revenue 給与収入金額
 * @return 給与所得控除
 *
 * 参考: https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1410.htm
 */
const calcSalaryIncomeDeduction = (revenue: number): number => {
  if (revenue <= 1_625_000) {
    return 550_000;
  } else if (revenue <= 1_800_000) {
    return revenue * 0.1 - 100_000;
  } else if (revenue <= 3_600_000) {
    return revenue * 0.3 + 80_000;
  } else if (revenue <= 6_600_000) {
    return revenue * 0.2 + 440_000;
  } else if (revenue <= 8_500_000) {
    return revenue * 0.1 + 1_100_000;
  } else {
    return 1_950_000;
  }
};

type SalaryIncomeInputProps = {
  salaryIncome: number;
  setSalaryIncome: (newValue: number) => void;
  salaryRevenue: number;
};

export const SalaryIncomeInput = (props: SalaryIncomeInputProps) => {
  const [revenue, setRevenue] = useState<number>(props.salaryRevenue); // 収入金額

  // salaryRevenueが変わった時は、 revenue を書き換える
  // これは、給与明細からのインプット機能によって給与収入が変わる場合に発火する
  useEffect(() => {
    setRevenue(props.salaryRevenue);
  }, [props.salaryRevenue]);

  const setSalaryIncome = props.setSalaryIncome;
  useEffect(() => {
    const salaryIncome = Math.max(
      0,
      revenue - calcSalaryIncomeDeduction(revenue),
    );
    setSalaryIncome(salaryIncome);
  }, [revenue, setSalaryIncome]);

  return (
    <>
      <CurrencyForm value={revenue} onChangeValue={setRevenue} />
      <br />
      給与所得控除: {formatCcy(calcSalaryIncomeDeduction(revenue))}
      <br />
      給与収入: {formatCcy(props.salaryIncome)}
    </>
  );
};
