import React, { useState } from "react";

import Shotoku from "./1_shotoku/shotoku_base";
import SonekiTsusan from "./2_soneki_tsusan/soneki_tsusan_base"
import KazeiShotoku from "./3_kazei_shotoku/kazei_shotoku_base";
import ShotokuHokenryoEasyInput from "./utils/shotoku_hokenryo_modal";
import Tax from "./4_tax/tax";

function App() {

    const [shotoku, setShotoku] = useState({
        // 所得項目キー: {"shunyu": 収入, "shotoku": 所得, ....}
        kyuyo: {
            "shunyu": undefined,  // 給与収入
            "kyuyo_shotoku_kojo": undefined,
            "shotoku": undefined,  // 給与所得
        },
    });

    const [kojo, setKojo] = useState({
        // 所得控除項目キー: {"is_applicable": T/F, "fromShotokuTax": 所得税からの控除額, "fromJuminTax": 住民税からの控除額, ....}
        zasson: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        iryohi: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        shakai_hokenryo: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        shokibo_kiryo_kyosai: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        seimei_hokenryo: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        jishin_hokenryo: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        kifukin: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        shougaisha: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        kafu: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        hitorioya: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        kinro_gakusei: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        haigusha_tokubetsu: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        fuyou: {
            "is_applicable": false,
            "fromShotokuTax": undefined,
            "fromJuminTax": undefined,
        },
        kiso: {
            "is_applicable": true,
            "fromShotokuTax": 480_000,
            "fromJuminTax":   430_000,
        },

    });

    console.log("App() called. shotoku=", shotoku, ", kojo=", kojo);

    return (
        <div className="App">
            <ShotokuHokenryoEasyInput  />

            <Shotoku
                shotokuData={shotoku}
                changeShotoku={setShotoku}
            />

            <SonekiTsusan />

            <KazeiShotoku
                kojoData={kojo}
                changeKojo={setKojo}
            />

            <Tax
                shotoku={shotoku}
                kojo={kojo}
            />
        </div>
    );
}

export default App;
