import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IncomeDict, IncomeInput} from "./01_IncomeInput/Income";
import {incomeTypes} from "./01_IncomeInput/IncomeTypes";
import {AggregationOfProfitLoss} from "./02_AggregationOfProfitLoss/AggregationOfProfitLoss";

function App() {
  // 所得計算用state
  const initIncomeDict: IncomeDict = Object.fromEntries(incomeTypes.map((incomeType)=>{return [incomeType.id, 0]}));
  const [incomeDict, setIncomeDict] = useState<IncomeDict>(initIncomeDict)

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
          <IncomeInput incomeDict={incomeDict} setIncomeDict={setIncomeDict} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          損益通算及び損失の繰越控除
        </AccordionSummary>
        <AccordionDetails>
          <AggregationOfProfitLoss />
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
