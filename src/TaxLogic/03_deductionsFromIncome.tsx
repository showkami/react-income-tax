import { createContext, PropsWithChildren, useContext } from "react";
import { deductionTypes } from "./03_deductionTypes";
import { sumArray } from "../utils";
import { useMedicalExpensesDeduction } from "./03_deductionsFromIncome/medicalExpenses";
import { useSocialInsurancePremiumDeduction } from "./03_deductionsFromIncome/socialInsurancePremium";

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
  // TODO: 新契約のみ or 旧契約のみ or 新旧両方 の3パターンある...
  // 各契約について、「支払った保険料」「剰余金・割戻金の合計額」を計算していく
  type InfoForEachContract = {
    isNew: boolean;
    category: "general" | "careOrMedical" | "pension";
    paidAmount: number;
    rebatedAmount: number;
  };
  const [lifeInsuranceContracts, setLifeInsuranceContracts] = useState<
    InfoForEachContract[]
  >([]);
  // 新旧、一般・介護医療・年金の各カテゴリごとの控除額
  const paidLifeInsurancePrems = {
    general: { old: 0, new: 0 },
    careOrMedical: { old: 0, new: 0 }, // 本当は旧契約の介護医療保険は無いが…入れないと型がめんどいので・・・
    pension: { old: 0, new: 0 },
  };
  for (const contract of lifeInsuranceContracts) {
    const category = contract.category;
    if (contract.isNew)
      paidLifeInsurancePrems[category].new +=
        contract.paidAmount - contract.rebatedAmount;
    if (contract.isNew)
      paidLifeInsurancePrems[category].old +=
        contract.paidAmount - contract.rebatedAmount;
  }
  const deduction = (gross: number)
  const isAllNew =
    lifeInsuranceContracts.filter((cont) => cont.isNew).length ===
    lifeInsuranceContracts.length;
  const isAllOld =
    lifeInsuranceContracts.filter((cont) => !cont.isNew).length ===
    lifeInsuranceContracts.length;
  if (isAllNew) {
    paidLifeInsurancePrems.general.new
  }

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
