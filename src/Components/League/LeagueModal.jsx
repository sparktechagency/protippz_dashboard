import React, { useEffect } from 'react';
import { Modal, Input, Button, Upload, Form } from 'antd';
import { CloseOutlined, CameraOutlined } from '@ant-design/icons';

const LeagueModal = ({ visible, onClose, onSubmit, isEdit, leagueData }) => {
    const [form] = Form.useForm();

    // Set form fields with league data if editing
    useEffect(() => {
        if (isEdit && leagueData) {
            form.setFieldsValue({
                leagueName: leagueData.leagueName,
                sport: leagueData.sport,
                image: leagueData.image,
            });
        } else {
            form.resetFields(); // Reset form if adding a new league
        }
    }, [isEdit, leagueData, form]);

    const handleFinish = (values) => {
        onSubmit(values); // Pass form values to the onSubmit function
        onClose();
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            closeIcon={<CloseOutlined />}
            centered
            width={400}
        >
            <h2 className="text-center font-semibold text-lg mb-6">{isEdit ? 'Edit League' : 'Add League'}</h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="space-y-4"
            >
                <Form.Item
                    label="League Name"
                    name="leagueName"
                    rules={[{ required: true, message: 'Please enter the league name' }]}
                >
                    <Input
                        placeholder="Enter league name"
                        className="border-green-500 focus:border-green-500"
                    />
                </Form.Item>

                <Form.Item
                    label="Sport"
                    name="sport"
                    rules={[{ required: true, message: 'Please enter the sport type' }]}
                >
                    <Input
                        placeholder="Enter sport type"
                        className="border-green-500 focus:border-green-500"
                    />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    valuePropName="file"
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        className="w-full border-dashed border-2 border-green-500"
                        showUploadList={false}
                        beforeUpload={() => false} // Prevent actual upload
                    >
                        <div className="flex flex-col items-center">
                            <CameraOutlined className="text-green-500 mb-2" />
                            <span className="text-green-500">{isEdit ? 'Change image' : 'Add image'}</span>
                        </div>
                    </Upload>
                </Form.Item>

                <div className="flex justify-between mt-6">
                    <Button onClick={onClose} className="text-green-500 border-green-500">Cancel</Button>
                    <Button type="primary" className="bg-green-500" htmlType="submit">
                        {isEdit ? 'Update' : 'Save'}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default LeagueModal;
