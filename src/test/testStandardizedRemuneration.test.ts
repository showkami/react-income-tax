import { getStandardizedMonthlyRemuneration } from "../00_InputFromSalaryStatement/StandardizedMonthlyRemuneration/calc";

describe("getStandardizedMonthlyRemuneration", () => {
  test("給与が範囲内の場合、対応する標準化給与を返す", async () => {
    const salary = 95000;
    const result = await getStandardizedMonthlyRemuneration(salary);
    expect(result).toBe(98000);
  });

  test("給与が最小値未満の場合、第1行の標準化給与を返す", async () => {
    const salary = 50000;
    const result = await getStandardizedMonthlyRemuneration(salary);
    expect(result).toBe(88000);
  });
  const {
    getStandardizedMonthlyRemuneration,
  } = require("../00_InputFromSalaryStatement/StandardizedMonthlyRemuneration/calc");
  test("給与が最大値以上の場合、最後の行の標準化給与を返す", async () => {
    const salary = 700000;
    const result = await getStandardizedMonthlyRemuneration(salary);
    expect(result).toBe(650000);
  });
});
