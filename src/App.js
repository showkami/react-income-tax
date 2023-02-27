import React, { useState } from "react";

import Shotoku from "./1_shotoku/shotoku_base";
import SonekiTsusan from "./2_soneki_tsusan/soneki_tsusan_base"
import KazeiShotoku from "./3_kazei_shotoku/kazei_shotoku_base";
import ShotokuHokenryoEasyInput from "./utils/shotoku_hokenryo_modal";
import Tax from "./4_tax/tax";

function App() {

    const [wholeStatement, setWholeStatement] = useState({
        shotoku: {
            // 所得項目キー: {"shunyu": 収入, "shotoku": 所得, ....}
            kyuyo: {
                "shunyu": undefined,  // 給与収入
                "kyuyo_shotoku_kojo": undefined,
                "shotoku": undefined,  // 給与所得
            },
        },

        kojo: {
            // 所得控除項目キー: {"is_applicable": T/F, "kojo_fromShotokuTax": 所得税からの控除額, "kojo_fromJuminTax": 住民税からの控除額, ....}
            zasson: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            iryo_hi: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            shakai_hokenryo: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            shokibo_kiryo_kyosai: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            seimei_hokenryo: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            jishin_hokenryo: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            kifukin: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            shougaisha: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            kafu: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            hitorioya: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            kinro_gakusei: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            haigusha_tokubetsu: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            fuyou: {
                "is_applicable": false,
                "kojo_fromShotokuTax": undefined,
                "kojo_fromJuminTax": undefined,
            },
            kiso: {
                "is_applicable": true,
                "kojo_fromShotokuTax": 480_000,
                "kojo_fromJuminTax":   430_000,
            },

        }
    });
    console.log("App() called. wholeStatement=", wholeStatement);


    function changeShotoku (newShotoku) {
        let newWholeStatement = {...wholeStatement};
        newWholeStatement.shotoku = newShotoku;
        setWholeStatement(newWholeStatement);
    }
    function changeKojo (newKojo) {
        let newWholeStatement = {...wholeStatement};
        newWholeStatement.kojo = newKojo;
        setWholeStatement(newWholeStatement);
    }

    return (
        <div className="App">
            <ShotokuHokenryoEasyInput  />

            <Shotoku
                shotokuData={wholeStatement.shotoku}
                changeShotoku={changeShotoku}
            />

            <SonekiTsusan />

            <KazeiShotoku
                kojoData={wholeStatement.kojo}
                changeKojo={changeKojo}
            />

            <Tax
                taxData={wholeStatement.tax}
            />
        </div>
    );
}

export default App;
