import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IncomeInput} from "./01_IncomeInput/Income";

function App() {
  return (
    <div>

      <Button>
        給与明細からインプット
      </Button>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          所得の計算
        </AccordionSummary>
        <AccordionDetails>
          <IncomeInput />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          損益通算
        </AccordionSummary>
        <AccordionDetails>

        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          課税所得の計算 (所得控除の反映)
        </AccordionSummary>
        <AccordionDetails>

        </AccordionDetails>
      </Accordion>

    </div>
  );
}

export default App;
