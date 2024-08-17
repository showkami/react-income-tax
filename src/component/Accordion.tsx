import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionProps = {
  title: string;
  content: React.JSX.Element;
  defaultExpanded?: boolean;
};

export const Accordion = (props: AccordionProps) => {
  return (
    <MuiAccordion
      disableGutters // 開閉時に上下に動かないようにする
      defaultExpanded={props.defaultExpanded ?? false}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <b>{props.title}</b>
      </AccordionSummary>
      <AccordionDetails>{props.content}</AccordionDetails>
    </MuiAccordion>
  );
};
