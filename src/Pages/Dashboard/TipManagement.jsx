import React, { useState } from 'react';
import { Table, Input, Button, Typography, Pagination } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import UserImageName from '../../Components/Shared/UserImageName';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const TipManagement = () => {
    const [activeTab, setActiveTab] = useState('Player');
    const [currentPage, setCurrentPage] = useState(1);
    const columns = {
        Player: [
            {
                title: 'SL no.',
                dataIndex: 'id',
                key: 'id',
                render: (text) => `#${text}`,
                width: '10%',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                width: '15%',
            },
            {
                title: "User's Name",
                dataIndex: 'userName',
                key: 'userName',
                render: (_, record) => (
                    <UserImageName name={record.userName} image={record.userImage} />
                ),
                width: '25%',
            },
            {
                title: 'Player Name',
                dataIndex: 'playerName',
                key: 'playerName',
                width: '25%',
            },
            {
                title: 'Tip Amount',
                dataIndex: 'tipAmount',
                key: 'tipAmount',
                render: (amount) => `$${amount}`,
                width: '15%',
            }
        ],
        Team: [
            {
                title: 'SL no.',
                dataIndex: 'id',
                key: 'id',
                render: (text) => `#${text}`,
                width: '10%',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                width: '15%',
            },
            {
                title: "User's Name",
                dataIndex: 'userName',
                key: 'userName',
                render: (_, record) => (
                    <UserImageName name={record.userName} image={record.userImage} />
                ),
                width: '25%',
            },
            {
                title: 'Team Name',
                dataIndex: 'teamName',
                key: 'teamName',
                width: '25%',
            },
            {
                title: 'Tip Amount',
                dataIndex: 'tipAmount',
                key: 'tipAmount',
                render: (amount) => `$${amount}`,
                width: '15%',
            }
        ]
    };
    const sampleData = {
        Player: [
            {
                id: '1233',
                date: '12/06/24',
                userName: 'Kathryn Murp',
                userImage: null,
                playerName: 'Darrell Steward',
                tipAmount: 100
            },
            {
                id: '1234',
                date: '10/06/24',
                userName: 'Devon Lane',
                userImage: null,
                playerName: 'Wade Warren',
                tipAmount: 5
            },
        ],
        Team: [
            {
                id: '1233',
                date: '12/06/24',
                userName: 'Kathryn Murp',
                userImage: null,
                teamName: 'New York Liberty',
                tipAmount: 100
            },
            {
                id: '1234',
                date: '10/06/24',
                userName: 'Devon Lane',
                userImage: null,
                teamName: 'Indiana Fever',
                tipAmount: 5
            },
            // Add more sample rows as needed
        ]
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        console.log('Search query:', value);
    };

    return (
        <div className='overflow-y-scroll h-screen' style={{ padding: '16px', backgroundColor: 'var(--bg-gray-20)', borderRadius: '8px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
                    </Link>
                    <h4 className="text-lg font-semibold">Tip Managements</h4>
                </div>
                <Input
                    placeholder="Search here..."
                    prefix={<SearchOutlined />}
                    style={{ width: '250px' }}
                    onChange={handleSearch}
                />
            </div>

            {/* Tab Buttons */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <Button style={{
                    background: activeTab === 'Player' && 'var(--color-green)'
                }} type={activeTab === 'Player' ? 'primary' : 'default'} onClick={() => handleTabChange('Player')}>
                    Player
                </Button>
                <Button style={{
                    background: activeTab !== 'Player' && 'var(--color-green)'
                }} type={activeTab === 'Team' ? 'primary' : 'default'} onClick={() => handleTabChange('Team')}>
                    Team
                </Button>
            </div>

            {/* Table */}
            <Table
                dataSource={sampleData[activeTab]}
                columns={columns[activeTab]}
                pagination={false} // Disable internal pagination
                rowKey="id"
            />

            {/* Custom Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span>Showing {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, sampleData[activeTab].length)} out of {sampleData[activeTab].length}</span>
                <Pagination
                    current={currentPage}
                    total={sampleData[activeTab].length}
                    pageSize={10}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default TipManagement;
