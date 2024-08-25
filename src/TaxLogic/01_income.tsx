import { createContext, PropsWithChildren, useContext, useState } from "react";
import { plusPart } from "./util";

export const IncomeContext = createContext<any>(null); // FIXME... any外せないかな

export const IncomeContextProvider = ({ children }: PropsWithChildren) => {
  // 利子所得
  const [interestIncome, setInterestIncome] = useState<number>(0);

  // 配当所得
  const [dividendIncome, setDividendIncome] = useState<number>(0);

  // 不動産所得
  const [realPropertyIncome, setRealPropertyIncome] = useState<number>(0);

  // 事業所得
  const [businessIncome, setBusinessIncome] = useState<number>(0);

  // 給与所得
  const [salaryRevenue, setSalaryRevenue] = useState<number>(0);
  const salaryIncomeDeduction = calcSalaryIncomeDeduction(salaryRevenue);
  const salaryIncome = plusPart(salaryRevenue - salaryIncomeDeduction);

  // 退職所得
  const [retirementIncome, setRetirementIncome] = useState<number>(0);

  // 山林所得
  const [timberIncome, setTimberIncome] = useState<number>(0);

  // 譲渡所得
  const [capitalGains, setCapitalGains] = useState<number>(0);

  // 一時所得
  const [occasionalIncome, setOccasionalIncome] = useState<number>(0);

  // 雑所得
  const [miscellaneousIncome, setMiscellaneousIncome] = useState<number>(0);

  // まとめ
  const states = {
    interestIncome,
    setInterestIncome,
    dividendIncome,
    setDividendIncome,
    realPropertyIncome,
    setRealPropertyIncome,
    businessIncome,
    setBusinessIncome,
    salaryRevenue,
    setSalaryRevenue,
    salaryIncome,
    retirementIncome,
    setRetirementIncome,
    timberIncome,
    setTimberIncome,
    capitalGains,
    setCapitalGains,
    occasionalIncome,
    setOccasionalIncome,
    miscellaneousIncome,
    setMiscellaneousIncome,
  };

  return (
    <IncomeContext.Provider value={states}>{children}</IncomeContext.Provider>
  );
};

export const useIncome = () => {
  // return
  return useContext(IncomeContext);
};

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
