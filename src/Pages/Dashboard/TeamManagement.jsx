import React, { useState } from 'react';
import { Table, Button, Input, Modal, Upload, Form, Select } from 'antd';
import { PlusOutlined, EyeOutlined, MailOutlined, EditOutlined, DeleteOutlined, CameraOutlined, CopyOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import Title from 'antd/es/skeleton/Title';
import { Link } from 'react-router-dom';

const TeamManagement = () => {
    const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
    const [isTipsDetailsModalVisible, setIsTipsDetailsModalVisible] = useState(false);
    const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [form] = Form.useForm();

    const sampleData = [
        {
            id: '1233',
            teamName: 'New York Liberty',
            teamLogo: 'https://via.placeholder.com/40',
            league: 'NBA',
            sport: 'Basketball',
            backgroundImage: 'https://via.placeholder.com/60',
            totalTips: '$4550',
            paidAmount: '$3500',
            due: '$1000',
            username: 'Robert345',
            password: '********',
        },
        {
            id: '1233',
            teamName: 'New York Liberty',
            teamLogo: 'https://via.placeholder.com/40',
            league: 'NBA1',
            sport: 'Basketball1',
            backgroundImage: 'https://via.placeholder.com/60',
            totalTips: '$4550',
            paidAmount: '$3500',
            due: '$1000',
            username: 'Robert345',
            password: '********',
        },
    ];

    const columns = [
        { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Team Name', dataIndex: 'teamName', key: 'teamName' },
        { title: 'Team Logo', dataIndex: 'teamLogo', key: 'teamLogo', render: (url) => <img src={url} alt="logo" className="w-10 h-10" /> },
        { title: 'League', dataIndex: 'league', key: 'league' },
        { title: 'Sport', dataIndex: 'sport', key: 'sport' },
        { title: 'Background Image', dataIndex: 'backgroundImage', key: 'backgroundImage', render: (url) => <img src={url} alt="bg" className="w-14 h-10" /> },
        {
            title: 'Tips Details',
            key: 'tipsDetails',
            render: (_, record) => (
                <button onClick={() => handleTipsDetails(record)} className="bg-yellow-500 text-white text-xl p-2 py-1 rounded-md" >
                    <EyeOutlined />
                </button>
            ),
        },
        {
            title: 'Invite',
            key: 'invite',
            render: (_, record) => (
                <button onClick={() => handleInvite(record)} className="bg-blue-500 text-white text-xl p-2 py-1 rounded-md" >
                    <MailOutlined />
                </button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(record)} className="bg-green-500 border-none text-white text-xl p-2 py-1 rounded-md" >
                        <EditOutlined />
                    </button>
                    <button className="bg-red-500 border-none text-white text-xl p-2 py-1 rounded-md" >
                        <DeleteOutlined />
                    </button>
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        setSelectedTeam(null);
        setIsAddEditModalVisible(true);
    };

    const handleEdit = (team) => {
        setSelectedTeam(team);
        setIsAddEditModalVisible(true);
        form.setFieldsValue(team);
    };

    const handleTipsDetails = (team) => {
        setSelectedTeam(team);
        setIsTipsDetailsModalVisible(true);
    };

    const handleInvite = (team) => {
        setSelectedTeam(team);
        setIsInviteModalVisible(true);
    };

    const handleFinish = (values) => {
        console.log(values);
        setIsAddEditModalVisible(false);
    };
    // const handleCopy = (text) => {
    //     navigator.clipboard.writeText(text).then(() => {
    //         alert("Copied to clipboard!");
    //     });
    // };
    return (
        <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} /></Link>
                    <h4 className="text-lg font-semibold">Team Management</h4>
                </div>
                <Input placeholder="Search here..." prefix={<FaSearch />} className="mb-6 w-64" />
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="bg-green-500 mb-3">Add</Button>
            <Table dataSource={sampleData} columns={columns} rowKey="id" pagination={{ position: ['bottomCenter'], pageSize: 10 }} />
            <Modal visible={isAddEditModalVisible} onCancel={() => setIsAddEditModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">{selectedTeam ? 'Edit Team' : 'Add Team'}</h2>
                <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={selectedTeam || {}}>
                    <Form.Item name="teamName" label="Team Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter team name" />
                    </Form.Item>
                    <Form.Item name="league" label="League" rules={[{ required: true }]}>
                        <Select placeholder="Select league">
                            <Select.Option value="NBA">NBA</Select.Option>
                            <Select.Option value="NFL">NFL</Select.Option>
                            {/* Add more options */}
                        </Select>
                    </Form.Item>
                    <Form.Item name="sport" label="Sport" rules={[{ required: true }]}>
                        <Input placeholder="Enter sport type" />
                    </Form.Item>
                    <Form.Item label="Team Logo" name="teamLogo">
                        <Upload listType="picture-card" maxCount={1} showUploadList={false} beforeUpload={() => false}>
                            <div className="flex flex-col items-center">
                                <CameraOutlined className="text-green-500 mb-2" />
                                <span className="text-green-500">Change logo</span>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Background Image" name="backgroundImage">
                        <Upload listType="picture-card" maxCount={1} showUploadList={false} beforeUpload={() => false}>
                            <div className="flex flex-col items-center">
                                <CameraOutlined className="text-green-500 mb-2" />
                                <span className="text-green-500">Change image</span>
                            </div>
                        </Upload>
                    </Form.Item>
                    <div className="flex justify-between mt-4">
                        <Button onClick={() => setIsAddEditModalVisible(false)} className="text-green-500 border-green-500">Cancel</Button>
                        <Button type="primary" htmlType="submit" className="bg-green-500">Save</Button>
                    </div>
                </Form>
            </Modal>

            {/* Tips Details Modal */}
            <Modal visible={isTipsDetailsModalVisible} onCancel={() => setIsTipsDetailsModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">Tips Details</h2>
                <div className="space-y-4">
                    <p>Total Tips: <span className="float-right">{selectedTeam?.totalTips}</span></p>
                    <p>Paid Amount: <span className="float-right">{selectedTeam?.paidAmount}</span></p>
                    <p>Due: <span className="float-right">{selectedTeam?.due}</span></p>
                    <Input placeholder="Enter Amount" />
                    <Button type="primary" className="w-full mt-4 bg-green-500">Confirm</Button>
                </div>
            </Modal>

            <Modal visible={isInviteModalVisible} onCancel={() => setIsInviteModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">Invite Credential</h2>
                <Form layout='vertical' className="space-y-4">
                    <Form.Item label="User Name">
                        <Input value={selectedTeam?.username} readOnly addonAfter={<button>
                            <CopyOutlined />
                        </button>} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password value={selectedTeam?.password} readOnly addonAfter={<button>
                            <CopyOutlined />
                        </button>} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TeamManagement;
