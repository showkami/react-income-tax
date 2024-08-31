import { createContext, PropsWithChildren, useContext } from "react";
import { deductionTypes } from "./03_deductionTypes";
import { sumArray } from "../utils";
import { useMedicalExpensesDeduction } from "./03_deductionsFromIncome/medicalExpenses";
import { useSocialInsurancePremiumDeduction } from "./03_deductionsFromIncome/socialInsurancePremium";
import {
  InfoForEachContract,
  useLifeInsurancePremium,
} from "./03_deductionsFromIncome/lifeInsurancePremium";

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
  lifeInsuranceContracts: InfoForEachContract[];
  setLifeInsuranceContracts: React.Dispatch<
    React.SetStateAction<InfoForEachContract[]>
  >;
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
  const {
    medicalExpensesDeductionAmt,
    paidMedicalExpenses,
    setPaidMedicalExpenses,
    compensatedMedicalExpenses,
    setCompensatedMedicalExpenses,
  } = useMedicalExpensesDeduction();
  deductionsAmount.medicalExpenses = medicalExpensesDeductionAmt;

  // 社会保険料控除
  const {
    socialInsurancePremiumDeductionAmt,
    paidSocialInsurancePremium,
    setPaidSocialInsurancePremium,
  } = useSocialInsurancePremiumDeduction();
  deductionsAmount.socialInsurancePremium = socialInsurancePremiumDeductionAmt;

  // 小規模企業共済等掛金控除

  // 生命保険料控除
  const {
    lifeInsurancePremiumDeductionAmt,
    lifeInsuranceContracts,
    setLifeInsuranceContracts,
  } = useLifeInsurancePremium();
  deductionsAmount.lifeINsurancePremium = lifeInsurancePremiumDeductionAmt;

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
    // 医療費控除用
    paidMedicalExpenses,
    setPaidMedicalExpenses,
    compensatedMedicalExpenses,
    setCompensatedMedicalExpenses,
    // 社会保険料控除用
    paidSocialInsurancePremium,
    setPaidSocialInsurancePremium,
    // 生命保険料控除用
    lifeInsuranceContracts,
    setLifeInsuranceContracts,
    // 控除すべて
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
