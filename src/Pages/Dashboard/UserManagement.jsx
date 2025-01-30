import { useState } from "react";
import { Table, Input, Switch, Button } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import UserImageName from "../../Components/Shared/UserImageName";
import { Link } from "react-router-dom";
import {
  useBlockUserMutation,
  useGetAllUserQuery,
} from "../../Redux/Apis/usersApi";
import toast from "react-hot-toast";
import { BsFiletypeCsv } from "react-icons/bs";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    isLoading: fetching,
    isFetching,
  } = useGetAllUserQuery({
    page,
    searchTerm,
    limit: 50,
  });
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

  const [csvReady, setCsvReady] = useState(false);
  const { data: csvUser, isLoading: csvLeagueDataLoading } = useGetAllUserQuery(
    { limit: 999999999999999 },
    { skip: !csvReady }
  );

  const exportDataCsv = () => {
    if (!csvUser?.data?.result) return [];
    return (
      csvUser?.data?.result?.map((user) => ({
        user_id: user?.user?._id || "N/A",
        user_status: user?.user?.status || "N/A",
        name: user?.name || "N/A",
        username: user?.username || "N/A",
        email: user?.email || "N/A",
        profile_image: user?.profile_image || "N/A",
        totalAmount: user?.totalAmount || 0,
        totalPoint: user?.totalPoint || 0,
        totalTipSent: user?.totalTipSent || 0,
        createdAt: user?.createdAt || "N/A",
        updatedAt: user?.updatedAt || "N/A",
      })) || []
    );
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
      render: (value) => `${value || "N/A"}`,
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
            checked={record?.user?.status === "in-progress"}
            onChange={(checked) =>
              handleStatusChange(
                record.user?._id,
                record?.user?.status === "in-progress"
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
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-lg font-semibold">User Management</h4>
            <Button
              disabled={csvLeagueDataLoading}
              className="ml-4 bg-[#2FC191] text-white"
              onClick={() => setCsvReady(true)}
            >
              {csvLeagueDataLoading
                ? "Processing your Data..."
                : "Download CSV"}
            </Button>
            <div>
              {csvUser?.data && (
                <CSVLink
                  data={exportDataCsv()}
                  headers={[
                    { label: "User ID", key: "user_id" },
                    { label: "User Status", key: "user_status" },
                    { label: "Name", key: "name" },
                    { label: "Username", key: "username" },
                    { label: "Email", key: "email" },
                    { label: "Profile Image", key: "profile_image" },
                    { label: "Total Amount", key: "totalAmount" },
                    { label: "Total Points", key: "totalPoint" },
                    { label: "Total Tips Sent", key: "totalTipSent" },
                    { label: "Created At", key: "createdAt" },
                    { label: "Updated At", key: "updatedAt" },
                  ]}
                  filename={`user-management-${new Date().toISOString()}.csv`}
                  className="flex items-center ml-2 justify-center gap-2"
                >
                  <Button
                    style={{
                      backgroundColor: "#053697",
                      color: "white",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#053692")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#053697")
                    }
                  >
                    <BsFiletypeCsv />
                    Export to CSV
                  </Button>
                </CSVLink>
              )}
            </div>
          </div>
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
