import { useState } from "react";
import { Table, Input, Button, Pagination } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import UserImageName from "../../Components/Shared/UserImageName";
import { Link } from "react-router-dom";
import { useGetTipsQuery } from "../../Redux/Apis/tipApis";

const TipManagement = () => {
  const [activeTab, setActiveTab] = useState("Player");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching } = useGetTipsQuery({
    entityType: activeTab,
    page: currentPage,
    searchTerm,
  });
  const columns = {
    Player: [
      // {
      //     title: 'SL no.',
      //     dataIndex: 'id',
      //     key: 'id',
      //     render: (text) => `#${text}`,
      //     width: '10%',
      // },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "15%",
        render: (createdAt) => {
          const date = new Date(createdAt);
          return (
            <span>{`${date.toLocaleString("en-US", {
              month: "short",
            })} ${date.getDate()}, ${date.getFullYear()}`}</span>
          );
        },
      },
      {
        title: "User's Name",
        dataIndex: "userName",
        key: "userName",
        render: (_, record) => (
          <UserImageName
            name={record?.user?.name}
            image={record?.user?.profile_image}
          />
        ),
        width: "25%",
      },
      {
        title: "Player Name",
        dataIndex: "entity",
        key: "entity",
        width: "25%",
        render: (entity) => <span>{entity?.name}</span>,
      },
      {
        title: "Tip Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => `$${new Intl.NumberFormat("en-US").format(amount)}`,
        width: "15%",
      },
    ],
    Team: [
      // {
      //     title: 'SL no.',
      //     dataIndex: 'id',
      //     key: 'id',
      //     render: (text) => `#${text}`,
      //     width: '10%',
      // },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "15%",
        render: (createdAt) => {
          const date = new Date(createdAt);
          return (
            <span>{`${date.toLocaleString("en-US", {
              month: "short",
            })} ${date.getDate()}, ${date.getFullYear()}`}</span>
          );
        },
      },
      {
        title: "User's Name",
        dataIndex: "userName",
        key: "userName",
        render: (_, record) => (
          <UserImageName
            name={record?.user?.name}
            image={record?.user?.profile_image}
          />
        ),
        width: "25%",
      },
      {
        title: "Team Name",
        dataIndex: "entity",
        key: "entity",
        width: "25%",
        render: (entity) => <span>{entity?.name}</span>,
      },
      {
        title: "Tip Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => `$${amount}`,
        width: "15%",
      },
    ],
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div
      className="overflow-y-scroll h-screen"
      style={{
        padding: "16px",
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
          <h4 className="text-lg font-semibold">Tip Managements</h4>
        </div>
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ width: "250px" }}
          onChange={handleSearch}
        />
      </div>

      {/* Tab Buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Button
          style={{
            background: activeTab === "Player" && "var(--color-green)",
          }}
          type={activeTab === "Player" ? "primary" : "default"}
          onClick={() => handleTabChange("Player")}
        >
          Player
        </Button>
        <Button
          style={{
            background: activeTab !== "Player" && "var(--color-green)",
          }}
          type={activeTab === "Team" ? "primary" : "default"}
          onClick={() => handleTabChange("Team")}
        >
          Team
        </Button>
      </div>

      {/* Table */}
      <Table
        scroll={{ x: 'max-content' }}
        loading={isLoading || isFetching}
        dataSource={data?.data?.result || []}
        columns={columns[activeTab]}
        pagination={false}
        rowKey="id"
      />

      {/* Custom Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <span>
          Showing {(currentPage - 1) * 10 + 1}-
          {Math.min(currentPage * 10, data?.data?.meta?.total)} out of{" "}
          {data?.data?.meta?.total}
        </span>
        <Pagination
          current={currentPage}
          total={data?.data?.meta?.total}
          pageSize={data?.data?.meta?.limit}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default TipManagement;
