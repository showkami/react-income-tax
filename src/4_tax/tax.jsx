import { render } from "@testing-library/react";
import { Button, Modal, Table } from "antd";
import React, { useState } from "react";

function Tax(){
    
    const [isShowTaxResult, setIsShowTaxResult] = useState(false);

    function renderTaxTable(){
        const columns = [
            {title: 'a', dataIndex: 'ind', key: 'key'}
        ];
        const dataSource = [
            {
                test: 'test'
            }
        ];
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