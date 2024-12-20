import React, { useState } from "react";
import { Form, Input, Button, message, Divider, Avatar } from "antd";
import { userApiInstance } from "@/utils/axios.config";
import SubmitButton from "../custom-submit-button";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../editor"), { ssr: false });

type FieldType = {
    title?: string;
    body?: string;
};

const Upload: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { t } = useTranslation("blog");
    const { user } = useSelector((state: any) => state.auth);
    const [body, setBody] = useState<string>("");

    const onFinish = async (values: FieldType) => {
        try {
            const response = await userApiInstance.post(
                "/post",
                { ...values, body },
                { withCredentials: true }
            );
            if (response.status === 200) {
                message.success("Post submitted successfully!");
                await router.push("../");
            }
        } catch (error) {
            message.error("Error submitting post. Please try again.");
            console.error("Error submit post:", error);
        }
    };

    return (
        <div className="flex w-full md:w-5/6 flex-wrap justify-center items-start ">
            <div className="w-full bg-white">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="md:p-7 m-2"
                >
                    <Form.Item>
                        <div className="flex items-center flex-wrap gap-2">
                            <Avatar
                                size={50}
                                style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
                            >
                                {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
                            </Avatar>
                            <span className="text-xl font-bold ml-3">
                                {user.fullname?.toUpperCase() || "Unknown User"}
                            </span>
                        </div>
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: "Please enter a title" }]}
                    >
                        <Input
                            placeholder={t("title")}
                            size="large"
                            maxLength={100}
                            className="hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 border border-black/50"
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item rules={[{ required: true, message: "Please enter content" }]}>
                        <QuillEditor value={body} setValue={setBody} />
                    </Form.Item>
                    <div className="flex justify-between">
                        <Form.Item className="flex-grow w-1/3">
                            <SubmitButton form={form}>{t("submit")}</SubmitButton>
                        </Form.Item>
                        <Form.Item className="flex-grow w-1/3 flex justify-end">
                            <Button
                                type="primary"
                                danger
                                className="flex-grow w-full text-xl h-auto"
                                onClick={() => {
                                    router.push("../");
                                }}
                            >
                                {t("cancel")}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Upload;
