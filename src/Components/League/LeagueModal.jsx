import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Upload, Form, Image } from 'antd';
import { CloseOutlined, CameraOutlined } from '@ant-design/icons';
import { url } from '../../Utils/BaseUrl';

const LeagueModal = ({ visible, onClose, onSubmit, isEdit, leagueData }) => {
    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState(null); // State to hold the image preview

    useEffect(() => {
        if (isEdit && leagueData) {
            form.setFieldsValue({
                name: leagueData.name,
                sport: leagueData.sport,
            });
            setPreviewImage(`${url}/${leagueData.league_image}`); // Set preview image for editing
        } else {
            form.resetFields();
            setPreviewImage(null); // Reset preview when adding a new league
        }
    }, [isEdit, leagueData, form]);

    const handleFinish = (values) => {
        onSubmit(values);
        // onClose();
    };
    const handleImageChange = (info) => {
        setPreviewImage(URL.createObjectURL(info.file));
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
                    name="name"
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
                        className=""
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleImageChange}
                    >
                        {/* Show preview image inside the upload area */}
                        {previewImage ? (
                            <div className="relative">
                                <Image
                                    width={100}
                                    src={previewImage}
                                    alt="Preview"
                                    preview={false}
                                />
                                <Button
                                    type="link"
                                    icon={<CloseOutlined />}
                                    onClick={() => setPreviewImage(null)} // Clear the preview when clicked
                                    className="absolute top-0 right-0 text-red-500"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <CameraOutlined className="text-green-500 mb-2" />
                                <span className="text-green-500">{isEdit ? 'Change image' : 'Add image'}</span>
                            </div>
                        )}
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
