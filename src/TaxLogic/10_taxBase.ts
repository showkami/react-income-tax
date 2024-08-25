import { useIncome } from "./01_income";

/**
 * 各種所得の金額を受け取って、それを各種課税標準に分配する。
 *
 * 課税標準は以下の通り11種類ある
 *     - 総所得金額 = 利子所得＋配当所得＋不動産所得＋事業所得＋給与所得＋短期譲渡所得＋長期譲渡所得/2＋一時所得/2＋雑所得
 *     - 土地等に係る事業所得等の金額
 *     - 短期譲渡所得の金額
 *     - 長期譲渡所得の金額
 *     - 上場株式等に係る配当所得等の金額
 *     - 上場株式等に係る譲渡所得等の金額
 *     - 一般株式等に係る譲渡所得等の金額
 *     - 先物取引に係る雑所得等の金額
 *     - 退職所得金額
 *     - 山林所得金額
 *     - 退職所得金額（分離課税）※住民税のみ
 * see 『所得税・個人住民税ガイドブック』十六　所得税額等の計算過程 (p.313)
 *
 *
 * // TODO: 損益通算や繰越控除を考慮できるようにする
 */
export const useTaxBase = () => {
  const {
    interestIncome,
    dividendIncome,
    realPropertyIncome,
    businessIncome,
    salaryIncome,
    // retirementIncome,
    // timberIncome,
    // capitalGains,
    occasionalIncome,
    miscellaneousIncome,
  } = useIncome();

  // 総所得金額
  const grossIncome =
    interestIncome +
    dividendIncome +
    realPropertyIncome +
    businessIncome +
    salaryIncome +
    //  // TODO: incomeDict側で譲渡所得を6つに分離してから、短期と長期/2を足す;
    occasionalIncome / 2 +
    miscellaneousIncome;

  return {
    grossIncome,
  };
};
