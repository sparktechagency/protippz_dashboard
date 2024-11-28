import React from 'react';
import { Table, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Transaction = () => {
    const data = [
        { id: '1233', date: '12/06/24', name: 'Kathryn Murp', type: 'Deposit Funds', amount: '$500', image: 'https://via.placeholder.com/40' },
        { id: '1234', date: '10/06/24', name: 'Devon Lane', type: 'Withdraw Funds', amount: '$1000', image: 'https://via.placeholder.com/40' },
        { id: '1235', date: '10/06/24', name: 'Foysal Rahman', type: 'Withdraw Funds', amount: '$100', image: 'https://via.placeholder.com/40' },
        { id: '1236', date: '05/06/24', name: 'Hari Danang', type: 'Deposit Funds', amount: '$500', image: 'https://via.placeholder.com/40' },
        { id: '1237', date: '04/06/24', name: 'Floyd Miles', type: 'Withdraw Funds', amount: '$50', image: 'https://via.placeholder.com/40' },
        { id: '1238', date: '04/06/24', name: 'Eleanor Pena', type: 'Deposit Funds', amount: '$1000', image: 'https://via.placeholder.com/40' },
        { id: '1239', date: '04/06/24', name: 'Devon Lane', type: 'Deposit Funds', amount: '$750', image: 'https://via.placeholder.com/40' },
        { id: '1240', date: '04/06/24', name: 'Hari Danang', type: 'Withdraw Funds', amount: '$50', image: 'https://via.placeholder.com/40' },
        { id: '1241', date: '04/06/24', name: 'Hari Danang', type: 'Withdraw Funds', amount: '$100', image: 'https://via.placeholder.com/40' },
        { id: '1242', date: '04/06/24', name: 'Hari Danang', type: 'Withdraw Funds', amount: '$50', image: 'https://via.placeholder.com/40' },
        // Add more data as needed
    ];

    const columns = [
        { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: "User's Name",
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center space-x-2">
                    <img src={record.image} alt="profile" className="w-8 h-8 rounded-full" />
                    <span>{text}</span>
                </div>
            ),
        },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    ];

    return (
        <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
                    </Link>
                    <h4 className="text-lg font-semibold">Transactions</h4>
                </div>
                <Input placeholder="Search here..." prefix={<FaSearch />} className="w-64" />
            </div>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                pagination={{ position: ['bottomCenter'], pageSize: 10 }}
            />
        </div>
    );
};

export default Transaction;
