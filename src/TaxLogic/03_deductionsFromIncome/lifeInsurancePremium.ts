import { useState } from "react";
import { plusPart } from "../util";
import { deductionTypes } from "../03_deductionTypes";

type LifeInsuranceCategory = "general" | "careOrMedical" | "pension";
export type InfoForEachContract = {
  isNew: boolean;
  category: LifeInsuranceCategory;
  paidAmount: number;
  rebatedAmount: number;
};
type PaidPrems = {
  [key in LifeInsuranceCategory]: { old: number; new: number };
};

export const useLifeInsurancePremium = () => {
  const [lifeInsuranceContracts, setLifeInsuranceContracts] = useState<
    InfoForEachContract[]
  >([]);

  const paidPrems: PaidPrems = {
    general: { old: 0, new: 0 },
    careOrMedical: { old: 0, new: 0 }, // 本当はoldは存在しないが。。
    pension: { old: 0, new: 0 },
  };
  for (const contract of lifeInsuranceContracts) {
    const category = contract.category;
    if (!contract.isNew && category === "careOrMedical") {
      throw new Error("介護医療保険では旧契約は適用できません。");
    }
    const amount = plusPart(contract.paidAmount - contract.rebatedAmount);
    contract.isNew
      ? (paidPrems[category].new += amount)
      : (paidPrems[category].old += amount);
  }

  const deductionAmtForGeneral = {
    forIncomeTax: getDeductionAmount(paidPrems.general, true),
    forResidentTax: getDeductionAmount(paidPrems.general, false),
  };
  const deductionAmtForCareOrMedical = {
    forIncomeTax: getDeductionAmount(paidPrems.careOrMedical, true),
    forResidentTax: getDeductionAmount(paidPrems.careOrMedical, false),
  };
  const deductionAmtForPension = {
    forIncomeTax: getDeductionAmount(paidPrems.pension, true),
    forResidentTax: getDeductionAmount(paidPrems.pension, false),
  };
  const deductionAmt = {
    forIncomeTax:
      deductionAmtForGeneral.forIncomeTax +
      deductionAmtForCareOrMedical.forIncomeTax +
      deductionAmtForPension.forIncomeTax,
    forResidentTax:
      deductionAmtForGeneral.forResidentTax +
      deductionAmtForCareOrMedical.forResidentTax +
      deductionAmtForPension.forResidentTax,
  };

  return {
    lifeInsurancePremiumDeductionAmt: deductionAmt,
    lifeInsuranceContracts,
    setLifeInsuranceContracts,
  };
};

// ===========================================================================
// ======== 控除額を求めるためのロジック ==========================================
// ===========================================================================

type DeductionAmountCalcTable = {
  min?: number;
  max?: number;
  coefficient: number;
  constant: number;
};
// 新契約に係る所得税に対する控除テーブル
const tableForNewContractIncomeTax: DeductionAmountCalcTable[] = [
  { max: 20_000, coefficient: 1, constant: 0 },
  { min: 20_000, max: 40_000, coefficient: 1 / 2, constant: 10_000 },
  { min: 40_000, max: 80_000, coefficient: 1 / 4, constant: 20_000 },
  { min: 80_000, coefficient: 0, constant: 40_000 },
];
// 新契約に係る住民税に対する控除テーブル
const tableForNewContractResidentTax: DeductionAmountCalcTable[] = [
  { max: 12_000, coefficient: 1, constant: 0 },
  { min: 12_000, max: 32_000, coefficient: 1 / 2, constant: 6_000 },
  { min: 32_000, max: 56_000, coefficient: 1 / 4, constant: 14_000 },
  { min: 56_000, coefficient: 0, constant: 28_000 },
];
// 旧契約に係る所得税に対する控除テーブル
const tableForOldContractIncomeTax: DeductionAmountCalcTable[] = [
  { max: 25_000, coefficient: 1, constant: 0 },
  { min: 25_000, max: 50_000, coefficient: 1 / 2, constant: 12_500 },
  { min: 50_000, max: 100_000, coefficient: 1 / 4, constant: 25_000 },
  { min: 100_000, coefficient: 0, constant: 50_000 },
];
// 旧契約に係る住民税に対する控除テーブル
const tableForOldContractResidentTax: DeductionAmountCalcTable[] = [
  { max: 15_000, coefficient: 1, constant: 0 },
  { min: 15_000, max: 40_000, coefficient: 1 / 2, constant: 7_500 },
  { min: 40_000, max: 70_000, coefficient: 1 / 4, constant: 17_500 },
  { min: 70_000, coefficient: 0, constant: 35_000 },
];
const applyTable = (table: DeductionAmountCalcTable[], value: number) => {
  for (const tblRow of table) {
    if (
      ((tblRow.min !== undefined && tblRow.min < value) ||
        tblRow.min === undefined) &&
      ((tblRow.max !== undefined && tblRow.max >= value) ||
        tblRow.max === undefined)
    ) {
      return value * tblRow.coefficient + tblRow.constant;
    }
  }
  throw new Error("あいうえお");
};
const getDeductionAmount = (
  paidPremsForEachCategory: { old: number; new: number },
  isForIncomeTax: boolean,
) => {
  // 新契約由来の控除額
  const deductionForNew = applyTable(
    isForIncomeTax
      ? tableForNewContractIncomeTax
      : tableForNewContractResidentTax,
    paidPremsForEachCategory.new,
  );

  // 旧契約由来の控除額
  const deductionForOld = applyTable(
    isForIncomeTax
      ? tableForOldContractIncomeTax
      : tableForOldContractResidentTax,
    paidPremsForEachCategory.old,
  );

  // 新契約にのみ加入している場合
  if (deductionForOld === 0) {
    return deductionForNew;
  }
  // 旧契約にのみ加入している場合
  else if (deductionForNew === 0) {
    return deductionForOld;
  }
  // 新旧どちらにも加入している場合
  else {
    // 旧契約の支払いが60,000円を超える場合 ... この場合は旧契約に対する控除のみ選択するのが有利 (https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1140.htm)
    if (paidPremsForEachCategory.old > 60_000) {
      return deductionForNew;
    }
    // 旧契約の支払いが60,000円以下の場合 ..... この場合は新旧合算 (max 40,000) を選択するのが有利 (https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1140.htm)
    else {
      return Math.min(40_000, deductionForOld + deductionForNew);
    }
  }
};
