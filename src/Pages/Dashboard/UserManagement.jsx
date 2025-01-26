import React, { useState } from "react";
import { Table, Input, Typography, Switch, Spin } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import UserImageName from "../../Components/Shared/UserImageName";
import { Link } from "react-router-dom";
import {
  useBlockUserMutation,
  useGetAllUserQuery,
} from "../../Redux/Apis/usersApi";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    isLoading: fetching,
    isFetching,
  } = useGetAllUserQuery({ page, searchTerm });
  const [block, { isLoading }] = useBlockUserMutation();
  const handleStatusChange = (userId, status) => {
    block({ id: userId, data: { status } })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <UserImageName name={record.name} image={record.profile_image} />
      ),
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      render: (phone) => <span>{phone || "N/A"}</span>,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      width: "15%",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%",
      render: (value) => `${value || 'N/A'}`,
    },
    {
      title: "Total Tips",
      dataIndex: "totalTipSent",
      key: "totalTipSent",
      width: "20%",
      render: (value) => `$${value}`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Switch
            checked={record?.user?.status == "in-progress"}
            onChange={(checked) =>
              handleStatusChange(
                record.user?._id,
                record?.user?.status == "in-progress"
                  ? "blocked"
                  : "in-progress"
              )
            }
            checkedChildren="Activate"
            unCheckedChildren="Deactivate"
          />
        );
      },
      width: "10%",
    },
  ];

  return (
    <div
      className="h-screen"
      style={{
        padding: "20px",
        backgroundColor: "var(--bg-gray-20)",
        borderRadius: "8px",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={-1}>
            <ArrowLeftOutlined
              style={{
                color: "#52c41a",
                fontSize: "18px",
                cursor: "pointer",
                marginRight: "8px",
              }}
            />
          </Link>
          <h4 className="text-lg font-semibold">User Management</h4>
        </div>
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ width: "250px" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table with Pagination */}
      <Table
        loading={isLoading || fetching || isFetching}
        dataSource={data?.data?.result || []}
        columns={columns}
        rowKey="id"
        pagination={{
          position: ["bottomCenter"],
          total: data?.data?.meta?.total,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} out of ${total}`,
          pageSize: data?.data?.meta?.limit,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
      />
    </div>
  );
};

export default UserManagement;
