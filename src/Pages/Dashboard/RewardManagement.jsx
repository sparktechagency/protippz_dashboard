import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form, Upload, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CameraOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RewardManagement = () => {
    const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
    const [selectedView, setSelectedView] = useState('Reward'); // Toggle state between Reward and Category
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();

    const rewardData = [
        {
            id: '1233',
            rewardName: 'VIP Tickets',
            image: 'https://via.placeholder.com/40',
            category: 'Tickets',
            pointsRequired: 200,
            description: 'Exclusive access to VIP...',
        },
        // Add more reward data as needed
    ];

    const categoryData = [
        {
            id: '1233',
            categoryName: 'Tickets',
            image: 'https://via.placeholder.com/40',
        },
        {
            id: '1234',
            categoryName: 'Shoes',
            image: 'https://via.placeholder.com/40',
        },
        // Add more category data as needed
    ];

    const rewardColumns = [
        { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Reward Name', dataIndex: 'rewardName', key: 'rewardName' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Points Required', dataIndex: 'pointsRequired', key: 'pointsRequired' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (url) => <img src={url} alt="reward" className="w-10 h-10" />
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(record)} className="bg-green-500 text-white text-xl p-2 py-1 rounded-md">
                        <EditOutlined />
                    </button>
                    <button className="bg-red-500 text-white text-xl p-2 py-1 rounded-md">
                        <DeleteOutlined />
                    </button>
                </div>
            ),
        },
    ];

    const categoryColumns = [
        { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (url) => <img src={url} alt="category" className="w-10 h-10" />
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(record)} className="bg-green-500 text-white text-xl p-2 py-1 rounded-md">
                        <EditOutlined />
                    </button>
                    <button className="bg-red-500 text-white text-xl p-2 py-1 rounded-md">
                        <DeleteOutlined />
                    </button>
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        setSelectedRecord(null);
        setIsAddEditModalVisible(true);
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setIsAddEditModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleFinish = (values) => {
        console.log(values);
        setIsAddEditModalVisible(false);
    };

    return (
        <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
                    </Link>
                    <h4 className="text-lg font-semibold">Reward Management</h4>
                </div>
                <Input placeholder="Search here..." prefix={<FaSearch />} className="w-64" />
            </div>
            <div className="flex space-x-2 mb-3">
                <button
                    className={`${selectedView === 'Reward' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-500'} px-4 rounded-md py-1`}
                    onClick={() => setSelectedView('Reward')}
                >
                    Reward
                </button>
                <button
                    className={`${selectedView === 'Category' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-500'} px-4 rounded-md py-1`}
                    onClick={() => setSelectedView('Category')}
                >
                    Category
                </button>
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="bg-green-500 mb-3">Add</Button>
            <Table
                dataSource={selectedView === 'Reward' ? rewardData : categoryData}
                columns={selectedView === 'Reward' ? rewardColumns : categoryColumns}
                rowKey="id"
                pagination={{ position: ['bottomCenter'], pageSize: 10 }}
            />
            <Modal visible={isAddEditModalVisible} onCancel={() => setIsAddEditModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">{selectedRecord ? 'Edit' : 'Add'} {selectedView}</h2>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    {selectedView === 'Reward' && (
                        <>
                            <Form.Item name="rewardName" label="Reward Name" rules={[{ required: true }]}>
                                <Input placeholder="Enter reward name" />
                            </Form.Item>
                            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                                <Select placeholder="Select category">
                                    <Select.Option value="Tickets">Tickets</Select.Option>
                                    <Select.Option value="Clothing">Clothing</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="pointsRequired" label="Points Required" rules={[{ required: true }]}>
                                <Input placeholder="Enter points required" type="number" />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea placeholder="Enter description" />
                            </Form.Item>
                        </>
                    )}
                    {selectedView === 'Category' && (
                        <Form.Item name="categoryName" label="Category Name" rules={[{ required: true }]}>
                            <Input placeholder="Enter category name" />
                        </Form.Item>
                    )}
                    <Form.Item label="Image" name="image">
                        <Upload listType="picture-card" maxCount={1} showUploadList={false} beforeUpload={() => false}>
                            <div className="flex flex-col items-center">
                                <CameraOutlined className="text-green-500 mb-2" />
                                <span className="text-green-500">Add image</span>
                            </div>
                        </Upload>
                    </Form.Item>
                    <div className="flex justify-between mt-4">
                        <Button onClick={() => setIsAddEditModalVisible(false)} className="text-green-500 border-green-500">Cancel</Button>
                        <Button type="primary" htmlType="submit" className="bg-green-500">Save</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default RewardManagement;
