type DeductionType = {
  nameJp: string,
  id: string,
}

export const deductionTypes: DeductionType[] = [
  {nameJp: "雑損", id: "casualty"},
  {nameJp: "医療費", id: "medicalExpenses"},
  {nameJp: "社会保険料", id: "socialInsurancePremium"},
  {nameJp: "小規模企業共済等掛金", id: "mutualAidPremium"},
  {nameJp: "生命保険料", id: "lifeInsurancePremium"},
  {nameJp: "地震保険料", id: "earthquakeInsurancePremium"},
  {nameJp: "寄附金", id: "donation"},
  {nameJp: "障害者", id: "disability"},
  {nameJp: "寡婦", id: "widow"},
  {nameJp: "ひとり親", id: "singleParent"},
  {nameJp: "勤労学生", id: "workingStudent"},
  {nameJp: "配偶者", id: "spousal"},
  {nameJp: "配偶者特別", id: "specialSpousal"},
  {nameJp: "扶養", id: "dependency"},
  {nameJp: "基礎", id: "basic"},
]

const deductionTypeIds = deductionTypes.map((deductionType) => deductionType.id)
export type DeductionTypeId = (typeof deductionTypeIds)[number];