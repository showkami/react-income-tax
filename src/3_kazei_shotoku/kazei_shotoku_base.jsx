import React, { useState } from "react";
import { Card, Divider, Statistic } from "antd";

import ShakaiHokenryoKojo from "./shakai_hokenryo_kojo";
import SeimeiHokenryoKojo from "./seimei_hokenryo_kojo";
import KifukinKojo from "./kifukin_kojo";

function NotImplementedShotokuKojo(){
    return <>NotImplementedShotokuKojo</>
}

function KazeiShotoku({kojoData, changeKojo}) {

    // 所得控除種別定義・コンポーネント定義
    const kojoTypes = {
        "zasson": {
            "label": "雑損控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"zasson"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "iryohi": {
            "label": "医療費控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"iryohi"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            )
        },

        "shakai_hokenryo": {
            "label": "社会保険料控除",
            "component": (
                <ShakaiHokenryoKojo
                    kojoTypeKey={"shakai_hokenryo"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "shokibo_kiryo_kyosai": {
            "label": "小規模企業共済等掛金控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"shokibo_kiryo_kyosai"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "seimei_hokenryo": {
            "label": "生命保険料控除",
            "component": (
                <SeimeiHokenryoKojo
                    kojoTypeKey={"seimei_hokenryo"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "jishin_hokenryo": {
            "label": "地震保険料控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"jishin_hokenryo"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "kifukin": {
            "label": "寄付金控除",
            "component": (
                <KifukinKojo
                    kojoTypeKey={"kifukin"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "shougaisha": {
            "label": "障害者控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"shougaisha"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "kafu": {
            "label": "寡婦控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"kafu"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "hitorioya": {
            "label": "ひとり親控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"hitorioya"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "kinro_gakusei": {
            "label": "勤労学生控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"kinro_gakusei"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "haigusha_tokubetsu": {
            "label": "配偶者特別控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"haigusha_tokubetsu"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "fuyou": {
            "label": "扶養控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"fuyou"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

        "kiso": {
            "label": "基礎控除",
            "component": (
                <NotImplementedShotokuKojo
                    kojoTypeKey={"kiso"}
                    kojoData={kojoData}
                    changeKojo={changeKojo}
                />
            ),
        },

    }

    // Card コンポーネントのタブと、タブの中身を作る
    let kojoTypeTabList = []
    let kojoTypeTabContent = []
    for (const kojoTypeId in kojoTypes) {
        const kojoJpnLabel = kojoTypes[kojoTypeId]["label"];
        kojoTypeTabList.push({
            key: kojoTypeId,
            tab: kojoJpnLabel,
        })

        kojoTypeTabContent[kojoTypeId] = kojoTypes[kojoTypeId]["component"]
    }
    const [activeTabKey, setActiveTabKey] = useState("shakai_hokenryo");  // 社会保険料控除タブをデフォルトでアクティブにしておく
    
    return (
        <Card
            title="課税所得の計算 (所得控除の反映)"
            tabList={kojoTypeTabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => {setActiveTabKey(key)}}
        >
            {kojoTypeTabContent[activeTabKey]}
            
            <Divider />

            <Statistic
                title={"所得税の課税基準所得からの" + kojoTypes[activeTabKey]["label"] + "額"}
                value={kojoData[activeTabKey]["fromShotokuTax"]}
            />
            <Statistic
                title={"住民税の課税基準所得からの" + kojoTypes[activeTabKey]["label"] + "額"}
                value={kojoData[activeTabKey]["fromJuminTax"]}
            />
        </Card>
    )
}

export default KazeiShotoku;