import React, { useState } from 'react';
import { Table, Button, Tag, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import UserImageName from './UserImageName';
import { url } from '../../Utils/BaseUrl';
const RewardTable = ({ data, pagination }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const handleActionClick = (record) => {
        if (record.email) {
            setModalContent(
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-center items-center my-2'>
                        <img src={`${url}/${record?.reward?.reward_image}`} alt="Reward" style={{ width: '100px' }} />
                    </div>
                    <p><strong>User's Name:</strong> {record?.user?.name}</p>
                    <p><strong>Email:</strong> {record?.email}</p>
                    <p><strong>Phone Number:</strong> {record?.user?.phone}</p>
                    <p><strong>Reward Name:</strong> {record?.reward?.name}</p>
                    <p><strong>Category:</strong> {record?.category?.name}</p>
                    <p><strong>Redeemed Points:</strong> {record.redeemedPoint}</p>
                    <p><strong>Status:</strong> {record?.status}</p>
                    <p><strong>Description:</strong> {record?.description}</p>
                    <p><strong>Service:</strong> {record?.status}</p>
                </div>
            );
        } else {
            setModalContent(
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-center items-center my-2'>
                        <img src={`${url}/${record?.reward?.reward_image}`} alt="Reward" style={{ width: '100px' }} />
                    </div>
                    <p><strong>User's Name:</strong> {record?.user?.name}</p>
                    {/* <p><strong>Email:</strong> {record.email}</p> */}
                    <p><strong>Phone Number:</strong> {record?.user?.phone}</p>
                    <p><strong>Reward Name:</strong> {record?.reward?.name}</p>
                    <p><strong>Category:</strong> {record?.category?.name}</p>
                    <p><strong>Redeemed Points:</strong> {record.redeemedPoint}</p>
                    <p><strong>Status:</strong> {record?.status}</p>
                    <p><strong>Shipping Address:</strong> {record?.streetAddress} {record?.state} {record?.zipCode}</p>
                    {/* <p><strong>Service:</strong> {record?.status}</p> */}
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
                <UserImageName name={record.user?.name} image={record.user?.profile_image} />
            )
        },
        {
            title: 'Contact Number',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => <span>{record?.user?.phone}</span>
        },
        {
            title: 'Reward Name',
            dataIndex: 'reward',
            key: 'reward',
            render: (reward) => <span>{reward?.name}</span>
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => <span>{category?.name}</span>
        },
        {
            title: 'Redeemed Points',
            dataIndex: 'redeemedPoint',
            key: 'redeemedPoint',
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
