import { PropsWithChildren, useContext, useState } from "react";
import { plusPart } from "./util";
import { createContext } from "react";

export type IncomeDict = any; // FIXME!!!!!!!!!!!!!!

type IncomeType = {
  nameJp: string;
  id: string;
};

export const incomeTypes: IncomeType[] = [
  { nameJp: "利子", id: "interest" },
  { nameJp: "配当", id: "dividend" },
  { nameJp: "不動産", id: "realProperty" },
  { nameJp: "事業", id: "business" },
  { nameJp: "給与", id: "salary" },
  { nameJp: "退職", id: "retirement" },
  { nameJp: "山林", id: "timber" },
  { nameJp: "譲渡", id: "capitalGains" }, // TODO: 譲渡所得を以下の6つに分ける：「短期」「長期」「土地建物等短期」「土地建物等長期」「上場株式等譲渡」「一般株式等譲渡」
  { nameJp: "一時", id: "occasional" },
  { nameJp: "雑", id: "miscellaneous" },
];

const incomeTypeIds = incomeTypes.map((incomeType) => incomeType.id);
export type IncomeTypeId = (typeof incomeTypeIds)[number];

export const IncomeContext = createContext<any>(null);

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
