import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

type GridProps<TData> = {
  height: number;
} & AgGridReactProps<TData>;

export const Grid = <TData extends any>(props: GridProps<TData>) => {
  const { height, ...rest } = props;
  const agGridProps: AgGridReactProps<TData> = rest;
  return (
    <div className={"ag-theme-quartz-dark"} style={{ height: height }}>
      <AgGridReact<TData> rowHeight={35} {...agGridProps} />
    </div>
  );
};

export const currencyFormatter = (param: any) => {
  return param.value !== undefined
    ? param.value.toLocaleString("ja-JP", {
        style: "currency",
        currency: "JPY",
      })
    : "";
};

export const editableMoneyColumn = {
  valueFormatter: currencyFormatter,
  editable: true,
  sortable: false,
  cellType: "number",
  type: "rightAligned",
  aggFunc: "sum", // Grand Total Row用
};
