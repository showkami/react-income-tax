import { render } from "@testing-library/react";
import { Button, Modal, Table } from "antd";
import React, { useState } from "react";

function Tax({shotoku, kojo}){
    
    const [isShowTaxResult, setIsShowTaxResult] = useState(false);

    function renderTaxTable(){
        const columns = [
            {dataIndex: 'calcShotokuTax', key: 'calcShotokuTax', title: '所得税の計算'},
            {dataIndex: 'calcJuminTax', key: 'calcJuminTax', title: '住民税の計算'},
        ];
        const dataSource = [
            // 所得控除の羅列
            {key: '1', calcShotokuTax: kojo.zasson.fromShotokuTax, calcJuminTax: kojo.zasson.fromJuminTax},
        ];
        console.log('dataSource=', dataSource)
        return (
            <>
                <Table
                    columns={columns}
                    dataSource={dataSource}
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