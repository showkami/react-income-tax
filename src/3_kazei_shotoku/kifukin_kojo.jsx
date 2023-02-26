import React, { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import MyInputNumber from "../utils/input_number";

function KifukinKojo({kojoTypeKey, kojoData, changeKojo}) {

    function changeKifukinKojo(paid_amount){
        // 所得税課税所得からの控除額は、 paid_amount - 2_000
        // 住民税課税所得からの控除はなし
        let newKojoData = {...kojoData};
        newKojoData[kojoTypeKey].kojo_fromShotokuTax = Math.max(paid_amount - 2_000, 0);
        newKojoData[kojoTypeKey].kojo_fromJuminTax = 0;
        changeKojo(newKojoData);
        console.log("newKojoData=", newKojoData);
        
    }

    return (
        <>
            <MyInputNumber
                description="寄付金支払額"
                placeholder="支払額"
                onChange={(value)=>{changeKifukinKojo(value)}}
            />
        </>
    )

};

export default KifukinKojo;