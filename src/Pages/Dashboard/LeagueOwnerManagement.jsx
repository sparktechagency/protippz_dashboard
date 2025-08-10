import React, { useState } from 'react';
import { Table, Avatar, Button, Space, Modal, Form, Input, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function LeagueOwnerManagement() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const leagues = [
    { value: 'Premier League', label: 'Premier League' },
    { value: 'Champions League', label: 'Champions League' },
    { value: 'Europa League', label: 'Europa League' },
  ];

  const data = [
    {
      id: 1,
      profile_img: 'https://i.pravatar.cc/50?img=1',
      name: 'John Doe',
      email: 'john@example.com',
      league_img: 'https://via.placeholder.com/40x40.png?text=L1',
      league_name: 'Premier League',
      createdAt: '2025-08-10',
    },
    {
      id: 2,
      profile_img: 'https://i.pravatar.cc/50?img=2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      league_img: 'https://via.placeholder.com/40x40.png?text=L2',
      league_name: 'Champions League',
      createdAt: '2025-08-09',
    },
  ];

  const handleOpenModal = (record = null) => {
    if (record) {
      setIsEditMode(true);
      setEditingRecord(record);
      form.setFieldsValue({
        name: record.name,
        email: record.email,
        league: record.league_name,
      });
    } else {
      setIsEditMode(false);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleFormSubmit = (values) => {
    if (isEditMode) {
      console.log('Updating league owner:', { id: editingRecord.id, ...values });
    } else {
      console.log('Adding new league owner:', values);
    }
    handleCloseModal();
  };

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile_img',
      key: 'profile_img',
      render: (text) => <Avatar src={text} size={40} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Assigned League',
      key: 'league',
      render: (_, record) => (
        <Space>
          <Avatar src={record.league_img} size={40} />
          <span>{record.league_name}</span>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            style={{
              backgroundColor: '#2FC191',
              borderColor: '#2FC191',
              color: '#FFFFFF',
            }}
            onClick={() => handleOpenModal(record)}
          >
            Edit
          </Button>
          <Button
            danger
            style={{
              backgroundColor: '#053697',
              borderColor: '#053697',
              color: '#FFFFFF',
            }}
            onClick={() => console.log('Delete', record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Add League Owner Button */}
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button
          type="primary"
          style={{
            backgroundColor: '#2FC191',
            borderColor: '#2FC191',
            color: '#FFFFFF',
          }}
          onClick={() => handleOpenModal()}
        >
          Add League Owner
        </Button>
      </div>

      {/* Table */}
      <Table
        scroll={{ x: 'max-content' }}
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{
          position: ['bottomCenter'],
          total: data.length,
          showTotal: false,
          pageSize: 5,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
      />

      {/* Modal */}
      <Modal
        title={isEditMode ? 'Edit League Owner' : 'Add League Owner'}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Profile Image"
            name="profile_img"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload name="logo" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input />
          </Form.Item>

          {!isEditMode && (
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item
            label="League"
            name="league"
            rules={[{ required: true, message: 'Please select a league' }]}
          >
            <Select options={leagues} placeholder="Select League" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#2FC191',
                borderColor: '#2FC191',
                color: '#FFFFFF',
              }}
            >
              {isEditMode ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default LeagueOwnerManagement;
