import React, { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import MyInputNumber from "../utils/input_number";

function SeimeiHokenryoKojo({kojoTypeKey, kojoData, changeKojo}) {

    function changeSeimeiHokenryoKojo(paid_amount){
        let newKojoData = {...kojoData};
        // TODO: 支払った金額の全額が控除対象になる...という実装をしているが、実際は違うので修正したい
        newKojoData[kojoTypeKey].kojo_fromShotokuTax = paid_amount;
        newKojoData[kojoTypeKey].kojo_fromJuminTax = paid_amount;
        changeKojo(newKojoData);
        console.log("newKojoData=", newKojoData);
        
    }

    return (
        <>
            <div><ExclamationCircleOutlined />TODO:控除限度額とのminをとる</div>

            <MyInputNumber
                placeholder="生命保険料"
                onChange={(value)=>{changeSeimeiHokenryoKojo(value)}}
            />
        </>
    )

};

export default SeimeiHokenryoKojo;