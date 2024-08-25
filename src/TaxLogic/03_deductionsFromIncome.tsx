import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { deductionTypes } from "./03_deductionTypes";
import { plusPart } from "./util";
import { sumArray } from "../utils";

// ある所得控除項目の、所得税用の所得控除・住民税用の所得控除
type DeductionAmount = { forIncomeTax: number; forResidentTax: number };
// 各所得控除の情報を持ったdict
type DeductionsAmountDict = { [key: string]: DeductionAmount };

// Context
type DeductionContextType = {
  paidMedicalExpenses: number;
  setPaidMedicalExpenses: React.Dispatch<React.SetStateAction<number>>;
  compensatedMedicalExpenses: number;
  setCompensatedMedicalExpenses: React.Dispatch<React.SetStateAction<number>>;
  paidSocialInsurancePremium: number;
  setPaidSocialInsurancePremium: React.Dispatch<React.SetStateAction<number>>;
  totalDeductionAmount: DeductionAmount;
};
const DeductionContext = createContext<DeductionContextType | undefined>(
  undefined,
);

export const DeductionsContextProvider = ({ children }: PropsWithChildren) => {
  const deductionsAmount: DeductionsAmountDict = Object.fromEntries(
    deductionTypes.map((deductionType) => {
      return [deductionType.id, { forIncomeTax: 0, forResidentTax: 0 }];
    }),
  );
  // 雑損控除

  // 医療費控除
  // TODO: 医療費控除の特例＝セルフメディケーション税制に対応する
  const [paidMedicalExpenses, setPaidMedicalExpenses] = useState<number>(0);
  const [compensatedMedicalExpenses, setCompensatedMedicalExpenses] =
    useState<number>(0);
  deductionsAmount.medicalExpenses = {
    forIncomeTax: plusPart(
      paidMedicalExpenses - compensatedMedicalExpenses - 100_000,
    ),
    forResidentTax: plusPart(
      paidMedicalExpenses - compensatedMedicalExpenses - 100_000,
    ),
    // NOTE: 総所得金額等が200万円未満の場合は、-100000 ではなく総所得金額等の5%を引く
  };

  // 社会保険料控除
  const [paidSocialInsurancePremium, setPaidSocialInsurancePremium] =
    useState<number>(0);
  deductionsAmount.socialInsurancePremium = {
    forIncomeTax: paidSocialInsurancePremium,
    forResidentTax: paidSocialInsurancePremium,
  };

  // 小規模企業共済等掛金控除

  // 生命保険料控除
  // TODO: 新契約のみ or 旧契約のみ or 新旧両方 の3パターンある...
  // const [paidAmountForIppanNewCont, setPaidAmountForIppanNewCont] =
  //   useState<number>(0);
  // const [paidAmountForIppanOldCont, setPaidAmountForIppanOldCont] =
  //   useState<number>(0);
  // const [paidAmountForKaigoOrIryoNewCont, setPaidAmountForKaigoOrIryoNewCont] =
  //   useState<number>(0);
  // const [paidAmountForNenkinNewCont, setPaidAmountForNenkinNewCont] =
  //   useState<number>(0);
  // const [paidAmountForNenkinOldCont, setPaidAmountForNenkinOldCont] =
  //   useState<number>(0);

  // 地震保険料控除

  // 寄附金控除

  // 障害者控除

  // 寡婦控除

  // ひとり親控除

  // 勤労学生控除

  // 配偶者控除

  // 扶養控除

  // 基礎控除
  deductionsAmount.basic = {
    forIncomeTax: 480_000,
    forResidentTax: 430_000,
  };

  // 控除額を合計する
  const totalDeductionAmount: DeductionAmount = {
    forIncomeTax: sumArray(
      Object.entries(deductionsAmount).map(
        ([typeId, deduction]) => deduction.forIncomeTax,
      ),
    ),
    forResidentTax: sumArray(
      Object.entries(deductionsAmount).map(
        ([typeId, deduction]) => deduction.forResidentTax,
      ),
    ),
  };

  const values: DeductionContextType = {
    paidMedicalExpenses,
    setPaidMedicalExpenses,
    compensatedMedicalExpenses,
    setCompensatedMedicalExpenses,
    paidSocialInsurancePremium,
    setPaidSocialInsurancePremium,
    totalDeductionAmount,
  };

  return (
    <DeductionContext.Provider value={values}>
      {children}
    </DeductionContext.Provider>
  );
};

export const useDeduction = () => {
  const deduction = useContext(DeductionContext);
  if (deduction === undefined) {
    throw new Error("deductionがundefinedです。。。");
  }
  return deduction;
};
