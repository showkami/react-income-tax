import React from "react";
import { Descriptions, InputNumber, Statistic, Table } from "antd";

import kyuyo_shotoku_kojo from "../master_data/kyuyo_shotoku_kojo.json"
import MyInputNumber from "../utils/input_number";

function KyuyoShotoku({shotokuData, changeShotoku}) {
    
    function changeKyuyoShunyuShotoku(newKyuyoShunyu) {
        // 新しい給与収入のインプットを受け取って、stateを更新する他、給与所得控除・給与所得の計算も行なって一緒にstateの更新を行う
        let newShotokuData = {...shotokuData};
        newShotokuData.kyuyo.shunyu = newKyuyoShunyu;
        newShotokuData.kyuyo.kyuyo_shotoku_kojo = computeKyuyoShotokuKojo(newShotokuData.kyuyo.shunyu);
        newShotokuData.kyuyo.shotoku = newShotokuData.kyuyo.shunyu - newShotokuData.kyuyo.kyuyo_shotoku_kojo;
        changeShotoku(newShotokuData);
    }

    function computeKyuyoShotokuKojo(income) {
        // 給与収入を受け取って、給与所得控除額を返す
    
        for (let key in kyuyo_shotoku_kojo) {
            if (key === "$comment") {continue}
            const master_data = kyuyo_shotoku_kojo[key];
            const isInThisTable = (
                ((master_data.include_from & master_data.from <= income) | (master_data.from < income))
                & (income < master_data.to | (master_data.include_to & income <= master_data.to))
            )
            if (isInThisTable) {
                return master_data.kojo_fixed + income * master_data.kojo_variable_ratio;
            } else {
                continue;
            }
        }
    }
    
    return (
        <>
            <MyInputNumber
                placeholder="給与収入"
                formatter={(value)=>{console.log(value.toLocaleString());return value.toLocaleString();}}
                step={100000}
                onChange={changeKyuyoShunyuShotoku}
            />

            <Statistic
                title="給与収入"
                value={shotokuData.kyuyo.shunyu}
            />

            <Statistic
                title="給与所得控除"
                value={shotokuData.kyuyo.kyuyo_shotoku_kojo}
            />

            <Statistic
                title="給与所得"
                value={shotokuData.kyuyo.shotoku}
            />
        </>
    );
}

export default KyuyoShotoku;