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
