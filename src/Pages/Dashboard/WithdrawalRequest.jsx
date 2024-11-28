import React, { useState } from 'react';
import { Table, Button, Input, Modal, Tag } from 'antd';
import { EyeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WithdrawalRequest = () => {
    const [selectedView, setSelectedView] = useState('User'); // Toggle state between User, Player, and Team
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const userData = [
        { id: '1233', date: '12/06/24', name: 'Robert Smith', requestAmount: '$500', withdrawOption: 'ACH', status: 'Pending', bankAccount: '5645767857', routing: '457546785466', bankName: 'AB Bank', accountHolder: 'Robert Smith' },
        // Add more user data as needed
    ];

    const playerData = [
        { id: '1233', date: '12/06/24', name: 'Kathryn Murp', requestAmount: '$500', withdrawOption: 'ACH', status: 'Pending', image: 'https://via.placeholder.com/40', bankAccount: '5645767857', routing: '457546785466', bankName: 'AB Bank', accountHolder: 'Kathryn Murp' },
        // Add more player data as needed
    ];

    const teamData = [
        { id: '1233', date: '12/06/24', name: 'New York Liberty', requestAmount: '$500', withdrawOption: 'ACH', status: 'Pending', bankAccount: '5645767857', routing: '457546785466', bankName: 'AB Bank', accountHolder: 'New York Liberty' },
        // Add more team data as needed
    ];

    const columns = [
        { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: selectedView === 'User' ? "User's Name" : selectedView === 'Player' ? "Player's Name" : "Team's Name",
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => selectedView === 'Player' ? (
                <div className="flex items-center space-x-2">
                    <img src={record.image} alt="profile" className="w-8 h-8 rounded-full" />
                    <span>{text}</span>
                </div>
            ) : (
                <span>{text}</span>
            ),
        },
        { title: 'Request Amount', dataIndex: 'requestAmount', key: 'requestAmount' },
        { title: 'Withdraw Option', dataIndex: 'withdrawOption', key: 'withdrawOption' },
        {
            title: 'View Details',
            key: 'viewDetails',
            render: (_, record) => (
                <button onClick={() => handleViewDetails(record)} className="bg-yellow-500 text-white text-xl p-2 py-1 rounded-md">
                    <EyeOutlined />
                </button>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Completed' ? 'green' : 'orange'}>{status}</Tag>
            ),
        },
    ];

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    const handleViewDetails = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const dataSource = selectedView === 'User' ? userData : selectedView === 'Player' ? playerData : teamData;

    return (
        <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
                    </Link>
                    <h4 className="text-lg font-semibold">Withdrawal Request</h4>
                </div>
                <Input placeholder="Search here..." prefix={<FaSearch />} className="w-64" />
            </div>
            <div className="flex space-x-2 mb-3">
                <Button 
                    className={selectedView === 'User' ? 'bg-green-500 text-white' : 'bg-green-200 text-green-500'}
                    onClick={() => handleViewChange('User')}
                >
                    User
                </Button>
                <Button 
                    className={selectedView === 'Player' ? 'bg-green-500 text-white' : 'bg-green-200 text-green-500'}
                    onClick={() => handleViewChange('Player')}
                >
                    Player
                </Button>
                <Button 
                    className={selectedView === 'Team' ? 'bg-green-500 text-white' : 'bg-green-200 text-green-500'}
                    onClick={() => handleViewChange('Team')}
                >
                    Team
                </Button>
            </div>
            <Table 
                dataSource={dataSource} 
                columns={columns} 
                rowKey="id" 
                pagination={{ position: ['bottomCenter'], pageSize: 10 }} 
            />

            {/* View Details Modal */}
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">Request Details</h2>
                <div className="space-y-4">
                    <p>{selectedView}'s Name: <span className="float-right">{selectedRecord?.name}</span></p>
                    <p>Request Amount: <span className="float-right">{selectedRecord?.requestAmount}</span></p>
                    <p>Bank Account Number: <span className="float-right">{selectedRecord?.bankAccount}</span></p>
                    <p>Routing Number: <span className="float-right">{selectedRecord?.routing}</span></p>
                    <p>Account Type: <span className="float-right">----</span></p>
                    <p>Bank Name: <span className="float-right">{selectedRecord?.bankName}</span></p>
                    <p>Account Holder Name: <span className="float-right">{selectedRecord?.accountHolder}</span></p>
                </div>
            </Modal>
        </div>
    );
};

export default WithdrawalRequest;
