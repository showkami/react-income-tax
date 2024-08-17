import fs from "fs";
import { parse } from "csv-parse";
import path from "path";

interface Range {
  min: number | null;
  max: number | null;
  standardizedRemuneration: number;
}

// CSVファイルを読み込み、パースしてSalaryRangeの配列を返します
function loadRange(): Promise<Range[]> {
  const csvFilePath = path.resolve(__dirname, "master.csv");
  return new Promise((resolve, reject) => {
    const salaryRanges: Range[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(
        parse({
          columns: true,
          trim: true,
        }),
      )
      .on("data", (row: any) => {
        salaryRanges.push({
          min: row.min ? parseFloat(row.min) : null,
          max: row.max ? parseFloat(row.max) : null,
          standardizedRemuneration: parseFloat(
            row.StandardizedMonthlyRemuneration,
          ),
        });
      })
      .on("end", () => {
        resolve(salaryRanges);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// 月額給与に対してStandardizedMonthlyRemunerationを返します
export async function getStandardizedMonthlyRemuneration(
  salary: number,
): Promise<number> {
  const salaryRanges = await loadRange();

  for (const range of salaryRanges) {
    if (
      (range.min === null || salary >= range.min) &&
      (range.max === null || salary < range.max)
    ) {
      return range.standardizedRemuneration;
    }
  }

  return Promise.reject("標準報酬月額が見つかりませんでした");
}
