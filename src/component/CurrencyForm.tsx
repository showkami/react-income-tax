import React, { useState } from "react";
import { Input } from "@mui/material";
import { formatCcy } from "../utils";

interface CurrencyFormProps {
  value: number;
  onChangeValue: (value: number) => void;
}

export const CurrencyForm = (props: CurrencyFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputted = evt.target.value.replace(/,/g, ""); // Remove commas
    if (/^\d*\.?\d*$/.test(inputted)) {
      // Check if the input is a valid number
      const newValue = Number(inputted);
      props.onChangeValue(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const displayValue = isFocused
    ? props.value.toString()
    : formatCcy(props.value);

  return (
    <Input
      type="text"
      inputMode={"numeric"}
      value={displayValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
