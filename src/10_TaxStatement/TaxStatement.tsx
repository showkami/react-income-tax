import { DeductionsDict } from "../03_DeductionsFromIncome/DeductionsFromIncome";
import { useEffect, useState } from "react";
import { ColDef } from "ag-grid-community";
import { Grid, uneditableMoneyColumn } from "../component/Grid";
import { formatCcy, sumArray } from "../utils";
import { applyIncomeTaxRate, getIncomeTaxRate } from "./applyIncomeTaxRate";
import { applyResidentTaxRate } from "./applyResidentTaxRate";
import { useTaxBase } from "../TaxLogic/10_taxBase";

type StatementRow = {
  item: string;
  incomeTaxCalc: number;
  residentTaxCalc: number;
};

type TaxStatementProps = {
  deductionsDict: DeductionsDict;
};

export const TaxStatement = (props: TaxStatementProps) => {
  // 課税標準を計算
  const { grossIncome } = useTaxBase();

  // 所得控除
  const deductionAmtForIncomeTax = sumArray(
    Object.entries(props.deductionsDict).map(
      ([typeId, deduction]) => deduction.forIncomeTax,
    ),
  );
  const deductionAmtForResidentTax = sumArray(
    Object.entries(props.deductionsDict).map(
      ([typeId, deduction]) => deduction.forResidentTax,
    ),
  );

  // 課税所得金額
  const taxableGrossIncomeForIncomeTax = Math.max(
    0,
    grossIncome - deductionAmtForIncomeTax,
  );
  const taxableGrossIncomeForResidentTax = Math.max(
    0,
    grossIncome - deductionAmtForResidentTax,
  );
  // MEMO: 他の課税所得金額 (課税短期譲渡所得金額とか) もちゃんと計算する際は、
  //       所得控除をダブルで引かないように、所得控除プールを作っておいたり
  //       正しい順番で控除ができるようにしたりする

  // 税率適用 (税額控除前)
  const incomeTaxBeforeCredit = applyIncomeTaxRate(
    taxableGrossIncomeForIncomeTax,
  ); // MEMO: 他の課税所得金額 x 税率 を全部足す必要がある
  const shotokuwariResidentTaxBeforeCredit = applyResidentTaxRate(
    taxableGrossIncomeForResidentTax,
  ); // MEMO: 住民税の税額控除は、所得割から控除される。均等割からは控除されない (ので、kintowariのほうはbeforeCreditをつけていない)
  const kintowariResidentTax = 5_000;
  const residentTaxBeforeCredit =
    shotokuwariResidentTaxBeforeCredit + kintowariResidentTax;

  // 税額控除 // TODO:実装
  const taxCreditForIncomeTax = 0;
  const taxCreditForResidentTax = 0;

  // 税額控除後の税金
  const incomeTax = incomeTaxBeforeCredit - taxCreditForIncomeTax;
  const shotokuwariResidentTax =
    shotokuwariResidentTaxBeforeCredit - taxCreditForResidentTax;
  const residentTax = shotokuwariResidentTax + kintowariResidentTax;

  // 住民税調整控除
  // ???

  /** ふるさと納税の限度額を計算しておく
   *
   * X円ふるさと納税したとき
   *    所得税からの控除        = (X - 2,000) * incomeTaxRate
   *    住民税からの控除(基本分) = (X - 2,000) * 0.1
   *    住民税からの控除(特例分) = (X - 2,000) * (1 - incomeTaxRate - 0.1)
   * つまり合計で X - 2,000 円が控除される。
   * ただし3行目の特例分には限界があって、その限界は「所得割額の20%」
   *    (X - 2,000) * (1 - incomeTaxRate - 0.1) <= shotokuwari * 0.2
   *    ==> X <= shotokuwari * 0.2 / (1 - incomeTaxRate - 0.1) + 2,000
   */
  const maxFurusato =
    (shotokuwariResidentTax * 0.2) /
      (1 - getIncomeTaxRate(taxableGrossIncomeForIncomeTax) - 0.1) +
    2000; // ? この所得税率は、課税総所得金額に対する税率でいいのか？他の課税所得？;

  // AGGrid用
  const [columnDefs] = useState<ColDef<StatementRow>[]>([
    { field: "item", sortable: false, width: 150, pinned: true },
    {
      field: "incomeTaxCalc",
      headerName: "所得税の計算",
      width: 150,
      ...uneditableMoneyColumn,
    },
    {
      field: "residentTaxCalc",
      headerName: "住民税の計算",
      width: 150,
      ...uneditableMoneyColumn,
    },
  ]);
  const [rowData, setRowData] = useState<StatementRow[]>([]);
  useEffect(() => {
    setRowData([
      {
        // 総所得金額 = 利子所得＋配当所得＋不動産所得＋事業所得＋給与所得＋短期譲渡所得＋長期譲渡所得/2＋一時所得/2＋雑所得
        item: "総所得金額",
        incomeTaxCalc: grossIncome,
        residentTaxCalc: grossIncome,
      },
      // MEMO: 他の課税標準 (「短期譲渡所得の金額」とか) も入れる
      {
        item: "所得控除",
        incomeTaxCalc: -1 * deductionAmtForIncomeTax,
        residentTaxCalc: -1 * deductionAmtForResidentTax,
      },
      {
        // 総所得金額 - 所得控除
        item: "課税総所得金額",
        incomeTaxCalc: taxableGrossIncomeForIncomeTax,
        residentTaxCalc: taxableGrossIncomeForResidentTax,
      },
      // MEMO: 他の課税所得金額 (「課税短期譲渡所得金額」とか) も入れる
      {
        item: "税額 (税額控除前)",
        incomeTaxCalc: incomeTaxBeforeCredit,
        residentTaxCalc: residentTaxBeforeCredit,
      },
      {
        item: "税額控除",
        incomeTaxCalc: -taxCreditForIncomeTax,
        residentTaxCalc: -taxCreditForResidentTax,
      },
      {
        item: "税額",
        incomeTaxCalc: incomeTax,
        residentTaxCalc: residentTax,
      },
    ]);
  }, [
    grossIncome,
    deductionAmtForIncomeTax,
    deductionAmtForResidentTax,
    taxableGrossIncomeForIncomeTax,
    taxableGrossIncomeForResidentTax,
    incomeTaxBeforeCredit,
    residentTaxBeforeCredit,
    taxCreditForIncomeTax,
    taxCreditForResidentTax,
    incomeTax,
    residentTax,
  ]);

  return (
    <>
      ※ふるさと納税上限金額: {formatCcy(maxFurusato)}
      <Grid<StatementRow>
        height={270}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </>
  );
};
