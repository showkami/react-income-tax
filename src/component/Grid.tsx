import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import { formatCcy } from "../utils";
import { ValueFormatterParams } from "ag-grid-community";

type GridProps<TData> = {
  height: number;
} & AgGridReactProps<TData>;

export const Grid = <TData extends any>(props: GridProps<TData>) => {
  const { height, ...rest } = props;
  const agGridProps: AgGridReactProps<TData> = rest;
  return (
    <div className={"ag-theme-quartz-dark"} style={{ height: height }}>
      <AgGridReact<TData>
        rowHeight={35}
        gridOptions={{
          suppressDragLeaveHidesColumns: true,
          suppressMovableColumns: true,
        }}
        {...agGridProps}
      />
    </div>
  );
};

export const currencyFormatter = (param: ValueFormatterParams) => {
  return param.value === undefined || param.value === null
    ? ""
    : formatCcy(param.value);
};

export const uneditableMoneyColumn = {
  valueFormatter: currencyFormatter,
  sortable: false,
  cellType: "number",
  type: "rightAligned",
  // aggFunc: "sum", // Grand Total Row用
};

export const editableMoneyColumn = {
  editable: true,
  // cellEditor: "agNumberCellEditor",
  ...uneditableMoneyColumn,
};
