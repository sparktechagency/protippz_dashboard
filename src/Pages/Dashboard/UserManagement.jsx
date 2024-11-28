import React, { useState } from 'react';
import { Table, Input, Typography, Switch } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import UserImageName from '../../Components/Shared/UserImageName';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const UserManagement = () => {
    const [userData, setUserData] = useState([
        {
            id: '1233',
            fullName: 'Kathryn Murp',
            userImage: null, // Null image
            email: 'bockely@att.com',
            phoneNumber: '(201) 555-0124',
            userName: 'bockely23',
            address: 'West Greenwich, RI',
            isActive: true,
        },
        {
            id: '1234',
            fullName: 'Devon Lane',
            userImage: null, // Null image
            email: 'csilvers@rizon.com',
            phoneNumber: '(219) 555-0116',
            userName: 'csilvers56',
            address: 'Jericho, NY 11753',
            isActive: false,
        },
        // Add more sample rows as needed
    ]);

    const handleStatusChange = (userId, isActive) => {
        setUserData((prevData) =>
            prevData.map((user) =>
                user.id === userId ? { ...user, isActive } : user
            )
        );
    };

    const columns = [
        {
            title: 'SL no.',
            dataIndex: 'id',
            key: 'id',
            render: (text) => `#${text}`,
            width: '10%',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (_, record) => (
                <UserImageName
                    name={record.fullName}
                    image={record.userImage}
                />
            ),
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '15%',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: '15%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Switch
                    checked={record.isActive}
                    onChange={(checked) => handleStatusChange(record.id, checked)}
                    checkedChildren="Activate"
                    unCheckedChildren="Deactivate"
                />
            ),
            width: '10%',
        }
    ];

    return (
        <div className='h-screen' style={{ padding: '20px', backgroundColor: 'var(--bg-gray-20)', borderRadius: '8px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
                    </Link>
                    <h4 className="text-lg font-semibold">User Management</h4>
                </div>
                <Input
                    placeholder="Search here..."
                    prefix={<SearchOutlined />}
                    style={{ width: '250px' }}
                    onChange={(e) => console.log('Search query:', e.target.value)}
                />
            </div>

            {/* Table with Pagination */}
            <Table
                dataSource={userData}
                columns={columns}
                rowKey="id"
                pagination={{
                    position: ['bottomCenter'],
                    total: 1239,
                    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
                    pageSize: 10,
                    showSizeChanger: false,
                    onChange: (page) => console.log('Page:', page)
                }}
            />
        </div>
    );
};

export default UserManagement;
