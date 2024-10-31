import React from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import {userApiInstance} from "@/utils/axiosConfig";

const PostComment: React.FC = () => {
    const handleFinish = async (values: { comment: string }) => {
        try {
            const response = await userApiInstance.post("/comment");
            if (response.status === 200) {
                message.success('Comment submitted successfully!');
            } else {
                message.error(`Error ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            message.error('Failed to submit comment. Please check your input and try again.');
        }
    };

    const handleCancel = () => {
        console.log('Comment cancelled');
    };

    return (
        <Form layout="vertical" onFinish={handleFinish} style={{ maxWidth: 400, margin: '0 auto' }}>
            <Form.Item name="comment" rules={[{ required: true, message: 'Please enter your comment' }]}>
                <Input.TextArea placeholder="Write your comment here..." rows={4} />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default PostComment;
