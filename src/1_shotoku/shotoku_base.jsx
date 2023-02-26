import React, { useState } from "react";
import { Card } from "antd";

import KyuyoShotoku from "./kyuyo_shotoku";
import IchijiShotoku from "./ichiji_shotoku";

function NotImplementedShotoku(){
    return <>NotImplementedShotoku</>
}

function Shotoku({shotokuData, changeShotoku}) {

    // 所得種別定義・コンポーネント定義
    const shotokuTypes = {
        "rishi": {
            "label": "利子所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "haito": {
            "label": "配当所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "fudosan": {
            "label": "不動産所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "jigyo": {
            "label": "事業所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "kyuyo": {
            "label": "給与所得",
            "component": (
                <KyuyoShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "taishoku": {
            "label": "退職所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "sanrin": {
            "label": "山林所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "joto": {
            "label": "譲渡所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },
    
        "ichiji": {
            "label": "一時所得",
            "component": (
                <IchijiShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },

        "zatsu": {
            "label": "雑所得",
            "component": (
                <NotImplementedShotoku
                    shotokuData={shotokuData}
                    changeShotoku={changeShotoku}
                />
            )
        },
    }
    

    // Card コンポーネントのタブと、タブの中身を作る
    let shotokuTypeTabList = []
    let shotokuTypeTabContent = []
    for (const shotokuTypeId in shotokuTypes) {
        const shotokuJpnLabel = shotokuTypes[shotokuTypeId]["label"]; // なんでオブジェクトのプロパティにアクセスするのに[]使ったり""で囲ったりしないといけないの？
        shotokuTypeTabList.push({
            key: shotokuTypeId,
            tab: shotokuJpnLabel,
        })

        shotokuTypeTabContent[shotokuTypeId] = shotokuTypes[shotokuTypeId]["component"]
    }
    const [activeTabKey, setActiveTabKey] = useState("kyuyo");  // 給与所得タブをデフォルトでアクティブにしておく

    return (
        <Card
            title="所得の計算"
            tabList={shotokuTypeTabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => {setActiveTabKey(key)}}
        >
            {shotokuTypeTabContent[activeTabKey]}
        </Card>
    )
}

export default Shotoku;