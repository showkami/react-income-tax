import React, { useState } from "react";
import MyInputNumber from "../utils/input_number";

function ShakaiHokenryoKojo({kojoTypeKey, kojoData, changeKojo}) {

    function changeShakaiHokenryoKojo(paid_amount){
        let newKojoData = {...kojoData};
        newKojoData[kojoTypeKey].fromShotokuTax = paid_amount;  // 支払った保険料の全額が控除対象
        newKojoData[kojoTypeKey].fromJuminTax = paid_amount;  // 支払った保険料の全額が控除対象
        changeKojo(newKojoData);
        console.log("newKojoData=", newKojoData);
        
    }

    return (
        <>
            <MyInputNumber
                placeholder="社会保険料"
                onChange={(value)=>{changeShakaiHokenryoKojo(value)}}
            />
        </>
    )

};

export default ShakaiHokenryoKojo;