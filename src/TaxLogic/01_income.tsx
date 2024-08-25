import { createContext, PropsWithChildren, useContext, useState } from "react";
import { plusPart } from "./util";
import { calcSalaryIncomeDeduction } from "./01_incomeUtils";

type IncomeContextType = {
  interestIncome: number;
  setInterestIncome: React.Dispatch<React.SetStateAction<number>>;
  dividendIncome: number;
  setDividendIncome: React.Dispatch<React.SetStateAction<number>>;
  realPropertyIncome: number;
  setRealPropertyIncome: React.Dispatch<React.SetStateAction<number>>;
  businessIncome: number;
  setBusinessIncome: React.Dispatch<React.SetStateAction<number>>;
  salaryRevenue: number;
  setSalaryRevenue: React.Dispatch<React.SetStateAction<number>>;
  salaryIncome: number;
  retirementIncome: number;
  setRetirementIncome: React.Dispatch<React.SetStateAction<number>>;
  timberIncome: number;
  setTimberIncome: React.Dispatch<React.SetStateAction<number>>;
  capitalGains: number;
  setCapitalGains: React.Dispatch<React.SetStateAction<number>>;
  occasionalIncome: number;
  setOccasionalIncome: React.Dispatch<React.SetStateAction<number>>;
  miscellaneousIncome: number;
  setMiscellaneousIncome: React.Dispatch<React.SetStateAction<number>>;
};
export const IncomeContext = createContext<IncomeContextType>({});

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
