import { Descriptions, InputNumber } from "antd";

export default function MyInputNumber({
    description,
    placeholder,
    value,

    readOnly=false,
    disabled=false,
    step,
    onChange,
})
{
    return (
        <Descriptions>
            <Descriptions.Item label={description}>

                <InputNumber
                    placeholder={placeholder}
                    value={value}
                    readOnly={readOnly}
                    disabled={disabled}
                    step={step}
                    onChange={onChange}
                />

            </Descriptions.Item>    
        </Descriptions>
    )
}