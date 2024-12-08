// import React, { useState } from 'react';
// import { Table, Button, Input, Modal, Upload, Form, Select } from 'antd';
// import { PlusOutlined, EyeOutlined, MailOutlined, EditOutlined, DeleteOutlined, CameraOutlined, CopyOutlined, ArrowLeftOutlined } from '@ant-design/icons';
// import { FaSearch } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const PlayerManagement = () => {
//     const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
//     const [isTipsDetailsModalVisible, setIsTipsDetailsModalVisible] = useState(false);
//     const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
//     const [selectedPlayer, setSelectedPlayer] = useState(null);
//     const [form] = Form.useForm();

//     const sampleData = [
//         {
//             id: '1233',
//             playerName: 'Kathryn Murp',
//             league: 'NBA',
//             team: 'New York Liberty',
//             position: 'Forward',
//             backgroundImage: 'https://via.placeholder.com/60',
//             totalTips: '$4550',
//             paidAmount: '$3500',
//             due: '$1000',
//             username: 'Robert345',
//             password: '********',
//         },
//         // Add more sample data as needed
//     ];

//     const columns = [
//         { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
//         { title: 'Player Name', dataIndex: 'playerName', key: 'playerName' },
//         { title: 'League', dataIndex: 'league', key: 'league' },
//         { title: 'Team', dataIndex: 'team', key: 'team' },
//         { title: 'Position', dataIndex: 'position', key: 'position' },
//         {
//             title: 'Background Image',
//             dataIndex: 'backgroundImage',
//             key: 'backgroundImage',
//             render: (url) => <img src={url} alt="bg" className="w-14 h-10" />
//         },
//         {
//             title: 'Tips Details',
//             key: 'tipsDetails',
//             render: (_, record) => (
//                 <button onClick={() => handleTipsDetails(record)} className="bg-yellow-500 text-white text-xl p-2 py-1 rounded-md">
//                     <EyeOutlined />
//                 </button>
//             ),
//         },
//         {
//             title: 'Invite',
//             key: 'invite',
//             render: (_, record) => (
//                 <button onClick={() => handleInvite(record)} className="bg-blue-500 text-white text-xl p-2 py-1 rounded-md">
//                     <MailOutlined />
//                 </button>
//             ),
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_, record) => (
//                 <div className="flex space-x-2">
//                     <button onClick={() => handleEdit(record)} className="bg-green-500 text-white text-xl p-2 py-1 rounded-md">
//                         <EditOutlined />
//                     </button>
//                     <button className="bg-red-500 text-white text-xl p-2 py-1 rounded-md">
//                         <DeleteOutlined />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     const handleAdd = () => {
//         setSelectedPlayer(null);
//         setIsAddEditModalVisible(true);
//     };

//     const handleEdit = (player) => {
//         setSelectedPlayer(player);
//         setIsAddEditModalVisible(true);
//         form.setFieldsValue(player);
//     };

//     const handleTipsDetails = (player) => {
//         setSelectedPlayer(player);
//         setIsTipsDetailsModalVisible(true);
//     };

//     const handleInvite = (player) => {
//         setSelectedPlayer(player);
//         setIsInviteModalVisible(true);
//     };

//     const handleFinish = (values) => {
//         console.log(values);
//         setIsAddEditModalVisible(false);
//     };

//     return (
//         <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
//             <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center">
//                     <Link to={-1}>
//                         <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
//                     </Link>
//                     <h4 className="text-lg font-semibold">Player Management</h4>
//                 </div>
//                 <Input placeholder="Search here..." prefix={<FaSearch />} className="w-64" />
//             </div>
//             <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="bg-green-500 mb-3">Add</Button>
//             <Table dataSource={sampleData} columns={columns} rowKey="id" pagination={{ position: ['bottomCenter'], pageSize: 10 }} />

//             {/* Add/Edit Modal */}
//             <Modal visible={isAddEditModalVisible} onCancel={() => setIsAddEditModalVisible(false)} footer={null} centered>
//                 <h2 className="text-center font-semibold text-lg mb-6">{selectedPlayer ? 'Edit Player' : 'Add Player'}</h2>
//                 <Form form={form} layout="vertical" onFinish={handleFinish}>
//                     <Form.Item name="playerName" label="Player Name" rules={[{ required: true }]}>
//                         <Input placeholder="Enter player name" />
//                     </Form.Item>
//                     <Form.Item name="league" label="League" rules={[{ required: true }]}>
//                         <Select placeholder="Select league">
//                             <Select.Option value="NBA">NBA</Select.Option>
//                             <Select.Option value="NFL">NFL</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item name="team" label="Team" rules={[{ required: true }]}>
//                         <Select placeholder="Select team">
//                             {/* Add team options */}
//                         </Select>
//                     </Form.Item>
//                     <Form.Item name="position" label="Position" rules={[{ required: true }]}>
//                         <Input placeholder="Enter position" />
//                     </Form.Item>
//                     <Form.Item label="Player Image" name="playerImage">
//                         <Upload listType="picture-card" maxCount={1} showUploadList={false} beforeUpload={() => false}>
//                             <div className="flex flex-col items-center">
//                                 <CameraOutlined className="text-green-500 mb-2" />
//                                 <span className="text-green-500">Add image</span>
//                             </div>
//                         </Upload>
//                     </Form.Item>
//                     <Form.Item label="Background Image" name="backgroundImage">
//                         <Upload listType="picture-card" maxCount={1} showUploadList={false} beforeUpload={() => false}>
//                             <div className="flex flex-col items-center">
//                                 <CameraOutlined className="text-green-500 mb-2" />
//                                 <span className="text-green-500">Add image</span>
//                             </div>
//                         </Upload>
//                     </Form.Item>
//                     <div className="flex justify-between mt-4">
//                         <Button onClick={() => setIsAddEditModalVisible(false)} className="text-green-500 border-green-500">Cancel</Button>
//                         <Button type="primary" htmlType="submit" className="bg-green-500">Save</Button>
//                     </div>
//                 </Form>
//             </Modal>

//             {/* Tips Details Modal */}
//             <Modal visible={isTipsDetailsModalVisible} onCancel={() => setIsTipsDetailsModalVisible(false)} footer={null} centered>
//                 <h2 className="text-center font-semibold text-lg mb-6">Tips Details</h2>
//                 <div className="space-y-4">
//                     <p>Total Tips: <span className="float-right">{selectedPlayer?.totalTips}</span></p>
//                     <p>Paid Amount: <span className="float-right">{selectedPlayer?.paidAmount}</span></p>
//                     <p>Due: <span className="float-right">{selectedPlayer?.due}</span></p>
//                     <Input placeholder="Enter Amount" />
//                     <Button type="primary" className="w-full mt-4 bg-green-500">Confirm</Button>
//                 </div>
//             </Modal>

//             {/* Invite Modal */}
//             <Modal visible={isInviteModalVisible} onCancel={() => setIsInviteModalVisible(false)} footer={null} centered>
//                 <h2 className="text-center font-semibold text-lg mb-6">Invite Credential</h2>
//                 <Form layout='vertical' className="space-y-4">
//                     <Form.Item label="User Name">
//                         <Input value={selectedPlayer?.username} readOnly addonAfter={<button>
//                             <CopyOutlined />
//                         </button>} />
//                     </Form.Item>
//                     <Form.Item label="Password">
//                         <Input.Password value={selectedPlayer?.password} readOnly addonAfter={<button>
//                             <CopyOutlined />
//                         </button>} />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default PlayerManagement;
import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Input, Modal, Upload, Form, Select, message, Image, Spin } from 'antd';
import { PlusOutlined, EyeOutlined, MailOutlined, EditOutlined, DeleteOutlined, CameraOutlined, CopyOutlined, ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetAllPlayerQuery, useCreatePlayerMutation, useUpdatePlayerMutation, useDeletePlayerMutation, useInvitePlayerMutation, useSendPlayerTipMutation } from '../../Redux/Apis/playerApis';
import { useGetAllLeagueQuery } from '../../Redux/Apis/leagueApis';
import { useGetAllTeamQuery } from '../../Redux/Apis/teamApis';
import { url } from '../../Utils/BaseUrl';
import toast from 'react-hot-toast';

const PlayerManagement = () => {
    const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
    const [isTipsDetailsModalVisible, setIsTipsDetailsModalVisible] = useState(false);
    const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [form] = Form.useForm();


    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)

    const [profileImage, setProfileImage] = useState(null)
    const [BgImage, setBgImage] = useState(null)

    const [league, setLeague] = useState('')


    const userNameRef = useRef()
    const passwordRef = useRef()

    const [tipAmount, setTipAmount] = useState(0)

    const { data: players, isFetching, isLoading, isError } = useGetAllPlayerQuery({ searchTerm, page });
    const { data: leagueData, isLoading: leagueLading } = useGetAllLeagueQuery({ limit: 9999999, })
    const { data: teams, isLoading: teamLoading, isFetching: teamFetching, error } = useGetAllTeamQuery({ limit: 9999999, league });
    const [createPlayer, { isLoading: creating }] = useCreatePlayerMutation();
    const [updatePlayer, { isLoading: updating }] = useUpdatePlayerMutation();
    const [deletePlayer, { isLoading: deleting }] = useDeletePlayerMutation();
    const [invitePlayer, { isLoading: inviting }] = useInvitePlayerMutation();
    const [sendTip, { isLoading: tipping }] = useSendPlayerTipMutation();

    const columns = [
        // { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
        { title: 'Player Name', dataIndex: 'name', key: 'name' },
        { title: 'League', dataIndex: 'league', key: 'league', render: (league) => `${league?.name}` },
        { title: 'Team', dataIndex: 'team', key: 'team', render: (team) => `${team?.name}` },
        { title: 'Position', dataIndex: 'position', key: 'position' },
        {
            title: 'Profile Image',
            dataIndex: 'player_bg_image',
            key: 'player_bg_image',
            render: (player_image) => <img src={`${url}/${player_image}`} alt="bg" className="w-14 h-10" />
        },
        {
            title: 'Background Image',
            dataIndex: 'player_bg_image',
            key: 'player_bg_image',
            render: (player_bg_image) => <img src={`${url}/${player_bg_image}`} alt="bg" className="w-14 h-10" />
        },
        {
            title: 'Tips Details',
            key: 'tipsDetails',
            render: (_, record) => (
                <button onClick={() => handleTipsDetails(record)} className="bg-yellow-500 text-white text-xl p-2 py-1 rounded-md">
                    <EyeOutlined />
                </button>
            ),
        },
        {
            title: 'Invite',
            key: 'invite',
            render: (_, record) => (
                <button onClick={() => handleInvite(record)} className="bg-blue-500 text-white text-xl p-2 py-1 rounded-md">
                    <MailOutlined />
                </button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(record)} className="bg-green-500 text-white text-xl p-2 py-1 rounded-md">
                        <EditOutlined />
                    </button>
                    <button onClick={() => handleDelete(record._id)} className="bg-red-500 text-white text-xl p-2 py-1 rounded-md">
                        <DeleteOutlined />
                    </button>
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        setSelectedPlayer(null);
        setProfileImage(null)
        form.resetFields()
        setBgImage(null)
        setIsAddEditModalVisible(true);
    };

    const handleEdit = (player) => {
        setSelectedPlayer(player);
        setIsAddEditModalVisible(true);
        form.setFieldsValue({
            name: player?.name,
            league: player?.league?._id,
            team: player?.team?._id,
            position: player?.position
        });
        setBgImage(`${url}/${player?.player_bg_image}`)
        setProfileImage(`${url}/${player?.player_image}`)
    };

    const handleTipsDetails = (player) => {
        setSelectedPlayer(player);
        setIsTipsDetailsModalVisible(true);
    };

    const handleInvite = (player) => {
        setSelectedPlayer(player);
        setIsInviteModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deletePlayer(id).unwrap();
            message.success('Player deleted successfully');
        } catch (error) {
            message.error('Failed to delete player');
        }
    };

    const handleFinish = async (values) => {
        const data = {
            league: values?.league,
            name: values?.name,
            position: values?.position,
            team: values?.team,
        }
        if (values?.playerImage?.file) {
            data.player_image = values?.playerImage?.file
        }
        if (values?.backgroundImage?.file) {
            data.player_bg_image = values?.backgroundImage?.file
        }
        const formData = new FormData()
        Object.keys(data)?.map(key => {
            formData.append(key, data[key])
        })
        if (selectedPlayer?._id) {
            updatePlayer({ id: selectedPlayer?._id, data: formData }).unwrap()
                .then(res => {
                    toast.success(res?.message)
                    form.resetFields()
                    setBgImage(null)
                    setProfileImage(null)
                    setIsAddEditModalVisible(false);
                }).catch(err => {
                    toast.error(err?.data?.message)
                })
        } else {
            createPlayer(formData).unwrap()
                .then(res => {
                    toast.success(res?.message)
                    form.resetFields()
                    setBgImage(null)
                    setProfileImage(null)
                    setSelectedPlayer(null)
                    setIsAddEditModalVisible(false);
                }).catch(err => {
                    toast.error(err?.data?.message)
                })
        }
    };

    const handleSendTip = async () => {
        sendTip({ id: selectedPlayer._id, data: { amount: Number(tipAmount) } }).unwrap()
            .then(res => {
                toast.success(res?.message)
                form.resetFields()
                setIsInviteModalVisible(false)
            }).catch(err => {
                toast.error(err?.data?.message)
            })
    };

    const handleInviteSubmit = async (value) => {
        invitePlayer({ id: selectedPlayer?._id, data: value }).unwrap()
            .then(res => {
                toast.success(res?.message)
                form.resetFields()
                setIsInviteModalVisible(false)
            }).catch(err => {
                toast.error(err?.data?.message)
            })
    };

    const handleCopy = (type) => {
        if (type == 'password' && passwordRef?.current) {
            passwordRef.current.select();
            document.execCommand('copy');
            toast.success('password copied successfully')
        } else if (userNameRef?.current) {
            userNameRef.current.select();
            document.execCommand('copy');
            toast.success('username copied successfully')
        }
    };

    return (
        <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Link to={-1}>
                        <ArrowLeftOutlined style={{ color: '#52c41a', fontSize: '18px', cursor: 'pointer', marginRight: '8px' }} />
                    </Link>
                    <h4 className="text-lg font-semibold">Player Management</h4>
                </div>
                <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search here..." prefix={<FaSearch />} className="w-64" />
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="bg-green-500 mb-3">Add</Button>
            <Table
                dataSource={players?.data?.result || []}
                columns={columns}
                rowKey="id"
                pagination={
                    {
                        position: ['bottomCenter'],
                        pageSize: players?.data?.meta?.limit,
                        total: players?.data?.meta?.total,
                        onChange: (page) => setPage(page),
                        showSizeChanger: false
                    }
                }
                loading={isLoading || creating || updating || deleting || inviting || tipping || isFetching}
            />

            {/* Add/Edit Modal */}
            <Modal open={isAddEditModalVisible} onCancel={() => setIsAddEditModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">{selectedPlayer ? 'Edit Player' : 'Add Player'}</h2>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="name" label="Player Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter player name" />
                    </Form.Item>
                    <Form.Item name="league" label="League" rules={[{ required: true }]}>
                        <Select onChange={(league) => setLeague(league)} showSearch placeholder="Select league">
                            {
                                leagueData?.data?.result?.map(item => <Select.Option value={item?._id}>{item?.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="team" label="Team" rules={[{ required: true }]}>
                        <Select showSearch placeholder="Select team">
                            {
                                (teamLoading || teamFetching) ? <Select.Option value=''>please wait loading....</Select.Option> : teams?.data?.result?.map(item => <Select.Option value={item?._id}>{item?.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="position" label="Position" rules={[{ required: true }]}>
                        <Input placeholder="Enter position" />
                    </Form.Item>
                    <Form.Item label="Player Image" name="playerImage">
                        <Upload onChange={(info) => setProfileImage(URL.createObjectURL(info.file))} listType="picture-card" maxCount={1} showUploadList={false} beforeUpload={() => false}>
                            {
                                profileImage ? <div className="relative">
                                    <Image
                                        width={100}
                                        src={profileImage}
                                        alt="Preview"
                                        preview={false}
                                    />
                                    <Button
                                        type="link"
                                        icon={<CloseOutlined />}
                                        onClick={() => setProfileImage(null)} // Clear the preview when clicked
                                        className="absolute top-0 right-0 text-red-500"
                                    />
                                </div> : <div className="flex flex-col items-center">
                                    <CameraOutlined className="text-green-500 mb-2" />
                                    <span className="text-green-500">Profile</span>
                                </div>
                            }

                        </Upload>
                    </Form.Item>
                    <Form.Item label="Background Image" name="backgroundImage">
                        <Upload onChange={(info) => setBgImage(URL.createObjectURL(info.file))} listType="picture-card" maxCount={1} showUploadList={false} beforeUpload={() => false}>
                            {
                                BgImage ? <div className="relative">
                                    <Image
                                        width={100}
                                        src={BgImage}
                                        alt="Preview"
                                        preview={false}
                                    />
                                    <Button
                                        type="link"
                                        icon={<CloseOutlined />}
                                        onClick={() => setBgImage(null)} // Clear the preview when clicked
                                        className="absolute top-0 right-0 text-red-500"
                                    />
                                </div> : <div className="flex flex-col items-center">
                                    <CameraOutlined className="text-green-500 mb-2" />
                                    <span className="text-green-500">Background</span>
                                </div>
                            }

                        </Upload>
                    </Form.Item>
                    <div className="flex justify-between mt-4">
                        <Button onClick={() => setIsAddEditModalVisible(false)} className="text-green-500 border-green-500">Cancel</Button>
                        <Button type="primary" htmlType="submit" className="bg-green-500">Save</Button>
                    </div>
                </Form>
            </Modal>

            {/* Tips Details Modal */}
            <Modal open={isTipsDetailsModalVisible} onCancel={() => setIsTipsDetailsModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">Tips Details</h2>
                <div className="space-y-4">
                    <p>Total Tips: <span className="float-right">{selectedPlayer?.totalTips}</span></p>
                    <p>Paid Amount: <span className="float-right">{selectedPlayer?.paidAmount}</span></p>
                    <p>Due: <span className="float-right">{selectedPlayer?.dueAmount}</span></p>
                    <p>send money</p>
                    <Input value={tipAmount} onChange={(e) => setTipAmount(e?.target?.value)} type='number' placeholder="Enter Amount" />
                    <Button type="primary" className="w-full mt-4 bg-green-500" onClick={handleSendTip}>Confirm</Button>
                </div>
            </Modal>

            {/* Invite Modal */}
            <Modal open={isInviteModalVisible} onCancel={() => setIsInviteModalVisible(false)} footer={null} centered>
                <h2 className="text-center font-semibold text-lg mb-6">Invite Credential</h2>
                <Form form={form} onFinish={handleInviteSubmit} layout='vertical' className="space-y-4">
                    <Form.Item rules={[
                        {
                            message: 'username is required',
                            required: true
                        }
                    ]} name={`username`} label="User Name">
                        <Input ref={userNameRef} addonAfter={<button onClick={() => handleCopy('username')} type='button'>
                            <CopyOutlined />
                        </button>} />
                    </Form.Item>
                    <Form.Item rules={[
                        {
                            message: 'password is required',
                            required: true
                        }
                    ]} name={`password`} label="Password">
                        <Input ref={passwordRef} addonAfter={<button onClick={() => handleCopy('password')} type='button'>
                            <CopyOutlined />
                        </button>} />
                    </Form.Item>
                    <Button htmlType='submit'>
                        Save Credential
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default PlayerManagement;
