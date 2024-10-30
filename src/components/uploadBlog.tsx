import React, {useState} from "react";
import {Form, Input, Button} from "antd";
import {runes} from "runes2";
import SubmitButton from "./disableSubmitButton";
import {userApiInstance} from "@/utils/axiosConfig";
import {useRouter} from "next/router";

const {TextArea} = Input;
type FieldType = {
    title?: string;
    body?: string;
};
const Upload: React.FC = () => {
    const [value, setValue] = useState("");
    const [form] = Form.useForm();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    const onFinish = async (values: FieldType) => {
        try {
            const response = await userApiInstance.post("/post", values, {withCredentials: true});
            if (response.status === 200) {
                await router.push("../");
            }
        } catch {
            console.log("error");
        }
    };
    return (
        <div className="flex flex-wrap justify-center items-center mx-20 ">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="w-2/3 md:w-2/3 border rounded-lg border-black p-5 md:p-7 m-2 "
            >
                <Form.Item name={"title"} rules={[{required: true, message: ""}]}>
                    <Input
                        count={{
                            show: false,
                            max: 100,
                            strategy: (txt) => runes(txt).length,
                            exceedFormatter: (txt, {max}) =>
                                runes(txt).slice(0, max).join(""),
                        }}
                        placeholder="New title"
                        variant="borderless"
                        size="large"
                        className={"hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 "}
                    />
                </Form.Item>
                <Form.Item name={"body"} rules={[{required: true, message: ""}]}>
                    <TextArea
                        size="large"
                        variant="borderless"
                        placeholder="Write content here"
                        value={value}
                        onChange={handleChange}
                        autoSize={{minRows: 3, maxRows: 50}}
                        className="hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 "
                    />
                </Form.Item>
                <div className="flex justify-between">
                    <Form.Item className="flex-grow w-1/3 justify-self-start">
                        <SubmitButton form={form}> Submit </SubmitButton>
                    </Form.Item>
                    <Form.Item className="flex-grow w-1/3 flex justify-end">
                        <Button type="primary" danger className={'flex-grow w-full'}>
                            Cancel
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default Upload;