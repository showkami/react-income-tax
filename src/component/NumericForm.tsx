import {TextField} from "@mui/material";
import React from "react";

const formatNumber = (val: number) => {
  return Number(val).toLocaleString();
}

type NumericFormProps = {
  label?: string,
  value: number,
  setValue: React.Dispatch<React.SetStateAction<number>>,
}

export const NumericForm = (props: NumericFormProps) => {
  // TODO: 3桁区切りでの表示
  return (
    <TextField
      type={"number"}
      label={props.label ?? ""}
      onChange={(evt) => {
        const inputted = evt.target.value;
        if (Number(inputted)) {
          props.setValue(Number(inputted))
        }
      }}
    />
  )
}