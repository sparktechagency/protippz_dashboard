import React, { useState } from 'react';
import { Table, Button, Tag, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import UserImageName from './UserImageName';
const RewardTable = ({ data, pagination }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const handleActionClick = (record) => {
        if (record.deliveryOption === 'Online') {
            setModalContent(
                <div>
                    <div className='flex justify-center items-center my-2'>
                        <img src={record.rewardImage} alt="Reward" style={{ width: '100px' }} />
                    </div>                    <p><strong>User's Name:</strong> {record.userName}</p>
                    <p><strong>Email:</strong> {record.email}</p>
                    <p><strong>Phone Number:</strong> {record.contactNumber}</p>
                    <p><strong>Reward Name:</strong> {record.rewardName}</p>
                    <p><strong>Category:</strong> {record.category}</p>
                    <p><strong>Redeemed Points:</strong> {record.redeemedPoints}</p>
                    <p><strong>Status:</strong> {record.status}</p>
                    <p><strong>Description:</strong> {record.description}</p>
                    <p><strong>Service:</strong> {record.status}</p>
                </div>
            );
        } else if (record.deliveryOption === 'Offline') {
            setModalContent(
                <div>
                    <div className='flex justify-center items-center my-2'>
                        <img src={record.rewardImage} alt="Reward" style={{ width: '100px' }} />
                    </div>                    <p><strong>User's Name:</strong> {record.userName}</p>
                    <p><strong>Email:</strong> {record.email}</p>
                    <p><strong>Phone Number:</strong> {record.contactNumber}</p>
                    <p><strong>Reward Name:</strong> {record.rewardName}</p>
                    <p><strong>Category:</strong> {record.category}</p>
                    <p><strong>Redeemed Points:</strong> {record.redeemedPoints}</p>
                    <p><strong>Status:</strong> {record.status}</p>
                    <p><strong>Shipping Address:</strong> {record.address}</p>
                    <p><strong>Service:</strong> {record.status}</p>
                </div>
            );
        }
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalVisible(false);
    };

    const columns = [
        // {
        //     title: 'SL no.',
        //     dataIndex: 'id',
        //     key: 'id',
        //     render: (text) => `#${text}`
        // },
        {
            title: "User's Name",
            dataIndex: 'userName',
            key: 'userName',
            render: (_, record) => (
                <UserImageName name={record.userName} image={record.userImage} />
            )
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Reward Name',
            dataIndex: 'rewardName',
            key: 'rewardName',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Redeemed Points',
            dataIndex: 'redeemedPoints',
            key: 'redeemedPoints',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const color = status === 'Pending' ? 'orange' : 'green';
                return (
                    <Tag color={color} style={{ borderRadius: '8px', padding: '5px 10px', fontSize: '14px' }}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    shape="circle"
                    onClick={() => handleActionClick(record)}
                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                />
            ),
        }
    ];

    return (
        <>
            <Table
                dataSource={data}
                columns={columns}
                pagination={
                    pagination
                        ? {
                            pageSize: pagination.limit || 10,
                            total: pagination.total || 0,
                            current: pagination.current || 1,
                            onChange: pagination.handler,
                            showSizeChanger: false,
                        }
                        : false
                }
                rowKey="id"
            />
            <Modal
                title="Redeem Request Details"
                visible={isModalVisible}
                footer={null}
                onCancel={closeModal}
                centered
            >
                {modalContent}
            </Modal>
        </>
    );
};

export default RewardTable;
