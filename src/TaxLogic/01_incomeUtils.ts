/**
 * 給与所得控除の金額の計算
 * @param revenue 給与収入金額
 * @return 給与所得控除
 *
 * 参考: https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1410.htm
 */
export const calcSalaryIncomeDeduction = (revenue: number): number => {
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
