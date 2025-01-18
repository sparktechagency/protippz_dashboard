import React, { useState } from 'react';
import { Table, Button, Input, Modal, Tag, Popconfirm } from 'antd';
import { EyeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetWithdrewQuery, useUpdateWithdrawMutation } from '../../Redux/Apis/withdrawApis';
import { url } from '../../Utils/BaseUrl';
import toast from 'react-hot-toast';

const WithdrawalRequest = () => {
    const [selectedView, setSelectedView] = useState('NormalUser'); // Toggle state between User, Player, and Team
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const { data, isLoading, isFetching } = useGetWithdrewQuery({ entityType: selectedView, searchTerm, page })
    const [update] = useUpdateWithdrawMutation()

    const columns = [
        // { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: selectedView === 'NormalUser' ? "User's Name" : selectedView === 'Player' ? "Player's Name" : "Team's Name",
            dataIndex: 'entityId',
            key: 'entityId',
            render: (entityId, record) => (
                <div className="flex items-center space-x-2">
                    <img src={`${url}/${entityId?.profile_image}`} alt="profile" className="w-8 h-8 rounded-full" />
                    <span>{entityId?.name}</span>
                </div>
            )
        },
        { title: 'Request Amount', dataIndex: 'amount', key: 'amount' },
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
            render: (status, record) => (
                <Popconfirm disabled={status !== 'Pending'}
                    title="Complete this Payment"
                    description="Are you sure to complete this payment?"
                    onConfirm={() => handleStatus(record?._id, 'Completed')}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Tag color={status === 'Pending' ? 'orange' : 'green'}>{status}</Tag>
                </Popconfirm>

            ),
        },
    ];
    const handleStatus = (id, status) => {
        update({ id, data: { status } }).unwrap()
            .then(res => {
                toast.success(res?.message)
            })
            .catch(err => {
                toast.error(err?.message)
            })
    }
    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    const handleViewDetails = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    return (
        <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
                    </Link>
                    <h4 className="text-lg font-semibold">Withdrawal Request</h4>
                </div>
                <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search here..." prefix={<FaSearch />} className="w-64" />
            </div>
            <div className="flex space-x-2 mb-3">
                <Button
                    className={selectedView === 'NormalUser' ? 'bg-green-500 text-white' : 'bg-green-200 text-green-500'}
                    onClick={() => handleViewChange('NormalUser')}
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
                loading={isLoading || isFetching}
                dataSource={data?.data?.result || []}
                columns={columns}
                rowKey="id"
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: data?.data?.meta?.limit,
                    total: data?.data?.meta?.total,
                    showSizeChanger: false,
                    onChange: (page) => setPage(page)
                }}
            />

            {/* View Details Modal */}
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">Request Details</h2>
                <div className="space-y-4">
                    <p>{selectedView}'s Name: <span className="float-right">{selectedRecord?.entityId?.name}</span></p>
                    <p>Request Amount: <span className="float-right">{selectedRecord?.amount}</span></p>
                    {
                        selectedRecord?.bankAccountNumber && <p>Bank Account Number: <span className="float-right">{selectedRecord?.bankAccountNumber}</span></p>
                    }
                    {
                        selectedRecord?.routingNumber && <p>Routing Number: <span className="float-right">{selectedRecord?.routingNumber}</span></p>
                    }
                    {
                        selectedRecord?.accountType && <p>Account Type: <span className="float-right">{selectedRecord?.accountType}</span></p>
                    }
                    {
                        selectedRecord?.bankName && <p>Bank Name: <span className="float-right">{selectedRecord?.bankName}</span></p>
                    }
                    {
                        selectedRecord?.accountHolderName && <p>Account Holder Name: <span className="float-right">{selectedRecord?.accountHolderName}</span></p>
                    }
                </div>
            </Modal>
        </div>
    );
};

export default WithdrawalRequest;
