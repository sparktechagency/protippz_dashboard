import React, { useState } from "react";
import { Table } from "antd";
import { useUserProfile } from "../../hooks/useUserProfile";
import { Link } from "react-router-dom";

function LeagueTopTable({ homePage = true }) {
  const { user } = useUserProfile();
  const [page, setPage] = useState(1);
  const data = [
    {
      key: "1",
      name: "John Brown",
      email: "johngmail.com",
      tips: "500",
    },
    {
      key: "2",
      name: "Mack Smith",
      email: "mackgmail.com",
      tips: "561",
    },
    {
      key: "3",
      name: "Joe Black",
      email: "joeblackgmail.com",
      tips: "500",
    },
    {
      key: "4",
      name: "David Lee",
      email: "davidleegmail.com",
      tips: "400",
    },
    {
      key: "5",
      name: "Sarah Taylor",
      email: "sarahtaylorgmail.com",
      tips: "350",
    },
    {
      key: "6",
      name: "Emily Chen",
      email: "emilychengmail.com",
      tips: "300",
    },
    {
      key: "7",
      name: "Michael Davis",
      email: "michaeldavisgmail.com",
      tips: "280",
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tips",
      dataIndex: "tips",
      key: "tips",
    },
  ];

  const paginationConfig =
    user?.user?.role === "superAdmin" && homePage
      ? {
          showSizeChanger: false,
          position: ["bottomCenter"],
          pageSize: 10,
          current: page,
          onChange: (page) => setPage(page),
        }
      : false;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Top Fans</h1>
        {!homePage && (
          <Link to={"/top-fans-management"}>
            <button className="bg-[var(--color-green)] text-white p-2 rounded">
              View All
            </button>
          </Link>
        )}
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
      />
    </div>
  );
}

export default LeagueTopTable;
