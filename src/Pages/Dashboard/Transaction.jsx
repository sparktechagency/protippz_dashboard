import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetTransitionQuery } from '../../Redux/Apis/withdrawApis';
import { url } from '../../Utils/BaseUrl';

const Transaction = () => {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const { data: transitions, isLoading, isFetching } = useGetTransitionQuery({ searchTerm, page })
    console.log(transitions)
    const columns = [
        // { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (createdAt) => `${createdAt?.split('T')?.[0]}` },
        {
            title: "User's Name",
            dataIndex: 'entityId',
            key: 'entityId',
            render: (entityId, record) => (
                <div className="flex items-center space-x-2">
                    <img src={`${url}/${entityId?.profile_image}`} alt="profile" className="w-8 h-8 rounded-full" />
                    <span>{entityId?.name}</span>
                </div>
            ),
        },
        { title: 'Type', dataIndex: 'transactionType', key: 'transactionType' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount) => `$${amount}` },
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
                <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search here..." prefix={<FaSearch />} className="w-64" />
            </div>
            <Table
                loading={isLoading || isFetching}
                dataSource={transitions?.data?.result || []}
                columns={columns}
                rowKey="id"
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: transitions?.data?.meta?.limit,
                    total: transitions?.data?.meta?.total,
                    onChange: (page) => setPage(page)
                }}
            />
        </div>
    );
};

export default Transaction;
