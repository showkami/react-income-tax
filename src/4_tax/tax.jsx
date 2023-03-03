import { render } from "@testing-library/react";
import { Button, Modal, Table } from "antd";
import React, { useState } from "react";

function Tax({shotoku, kojo}){
    
    const [isShowTaxResult, setIsShowTaxResult] = useState(false);

    // 総所得金額
    const totalShotoku = (
        ()=>{
            let tmp = 0;
            for (const shotokuName in shotoku) {
                tmp += shotoku[shotokuName].shotoku !== undefined ? shotoku[shotokuName].shotoku : 0;
            }
            return tmp;
        }
    )();

    // 総所得控除額
    const [totalKojoFromShotokuTax, totalKojoFromJuminTax] = (
        ()=>{
            let [tmpShotoku, tmpJumin] = [0, 0];
            for (const kojoName in kojo) {
                tmpShotoku += kojo[kojoName].fromShotokuTax !== undefined ? kojo[kojoName].fromShotokuTax : 0;
                tmpJumin += kojo[kojoName].fromJuminTax !== undefined? kojo[kojoName].fromJuminTax : 0;
            }
            return [tmpShotoku, tmpJumin]
        }
    )();

    // 課税標準
    const taxedShotokuForShotokuTax = Math.max(0, totalShotoku - totalKojoFromShotokuTax);
    const taxedShotokuForJuminTax = Math.max(0, totalShotoku - totalKojoFromJuminTax);

    function renderTaxTable(){
        const columns = [
            {dataIndex: 'indexCol', key: 'indexCol', title: '項目'},
            {dataIndex: 'calcShotokuTax', key: 'calcShotokuTax', title: '所得税の計算'},
            {dataIndex: 'calcJuminTax', key: 'calcJuminTax', title: '住民税の計算'},
        ];

        let dataSource = [];

        // 総所得の行を追加
        dataSource.push({
            key: "totalShotoku",
            indexCol: "総所得",
            calcShotokuTax: totalShotoku,
            calcJuminTax: totalShotoku,
        })

        // 所得控除の行を追加
        for (const kojoName in kojo) {
            dataSource.push({
                key: kojoName,
                indexCol: '',  // 所得控除名を入れたい。。 
                calcShotokuTax: kojo[kojoName].fromShotokuTax,
                calcJuminTax: kojo[kojoName].fromJuminTax,
            });
        }

        // 所得控除合計額の行を追加
        dataSource.push({
            key: "kojoTotal",
            indexCol: "所得控除の合計",
            calcShotokuTax: totalKojoFromShotokuTax,
            calcJuminTax: totalKojoFromJuminTax,
        })

        // 課税所得の表示
        dataSource.push({
            key: "taxedShotoku",
            indexCol: "課税標準",
            calcShotokuTax: taxedShotokuForShotokuTax,
            calcJuminTax: taxedShotokuForJuminTax,
        })
        
        console.log('dataSource=', dataSource)
        return (
            <>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                >

                </Table>
            </>
        )
    }

    return (
        <>
            <Button
                type="primary"
                onClick={()=>(setIsShowTaxResult(!isShowTaxResult))}
            >
                所得税計算結果を表示
            </Button>

            <Modal
                open={isShowTaxResult}
                onOk={()=>setIsShowTaxResult(false)}
                onCancel={()=>setIsShowTaxResult(false)}
            >
                {renderTaxTable()}
            </Modal>
        </>
    )
}

export default Tax;