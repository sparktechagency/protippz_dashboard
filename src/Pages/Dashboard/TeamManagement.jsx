/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Upload,
  Form,
  Select,
  Image,
  Popconfirm,
  message,
  Radio,
  Spin,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  CameraOutlined,
  CopyOutlined,
  ArrowLeftOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useDeleteTeamSelectedMutation,
  useGetAllTeamQuery,
  useInviteTeamMutation,
  useSendTipMutation,
  useUpdateTeamMutation,
} from "../../Redux/Apis/teamApis";
import { url } from "../../Utils/BaseUrl";
import { useGetAllLeagueQuery } from "../../Redux/Apis/leagueApis";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const TeamManagement = () => {
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [isTipsDetailsModalVisible, setIsTipsDetailsModalVisible] =
    useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectItemId, setSelectItemId] = useState([]);
  const [form] = Form.useForm();

  const [profileImage, setProfileImage] = useState(null);
  const [BgImage, setBgImage] = useState(null);

  const userNameRef = useRef();
  const passwordRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [league, setLeague] = useState("");
  const [tipAmount, setTipAmount] = useState(0);

  const {
    data: leagueData,
    isLoading: leagueLading,
    isFetching,
  } = useGetAllLeagueQuery({ limit: 9999999 });
  const { data, isLoading } = useGetAllTeamQuery({
    searchTerm,
    league,
    page,
    limit: 250,
  });
  const [create, { isLoading: creating }] = useCreateTeamMutation();
  const [update, { isLoading: updating }] = useUpdateTeamMutation();
  const [deleteTeam, { isLoading: deleting }] = useDeleteTeamMutation();
  const [deleteSelect, { isLoading: deletingSelect }] =
    useDeleteTeamSelectedMutation();
  const [invite, { isLoading: inviting }] = useInviteTeamMutation();
  const [tip, { isLoading: tipping }] = useSendTipMutation();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    // { title: 'SL no.', dataIndex: 'id', key: 'id', render: (text) => `#${text}` },
    { title: "Team Name", dataIndex: "name", key: "name" },
    {
      title: "Team Logo",
      dataIndex: "team_logo",
      key: "team_logo",
      render: (team_logo) => (
        <img src={`${url}/${team_logo}`} alt="logo" className="w-10 h-10" />
      ),
    },
    {
      title: "League",
      dataIndex: "league",
      key: "league",
      render: (league) => <span>{league?.name}</span>,
    },
    { title: "Sport", dataIndex: "sport", key: "sport" },
    {
      title: "Background Image",
      dataIndex: "team_bg_image",
      key: "team_bg_image",
      render: (team_bg_image) => (
        <img src={`${url}/${team_bg_image}`} alt="bg" className="w-14 h-10" />
      ),
    },
    {
      title: "Tips Details",
      key: "tipsDetails",
      render: (_, record) => (
        <button
          onClick={() => handleTipsDetails(record)}
          className="bg-yellow-500 text-white text-xl p-2 py-1 rounded-md"
        >
          <EyeOutlined />
        </button>
      ),
    },
    {
      title: "Invite",
      key: "invite",
      render: (_, record) => (
        <button
          onClick={() => handleInvite(record)}
          className="bg-blue-500 text-white text-xl p-2 py-1 rounded-md"
        >
          <MailOutlined />
        </button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(record)}
            className="bg-green-500 border-none text-white text-xl p-2 py-1 rounded-md"
          >
            <EditOutlined />
          </button>
          <button
            onClick={
              () => handleDelete(record?._id)
              // deleteTeam(record?._id)
            }
            className="bg-red-500 border-none text-white text-xl p-2 py-1 rounded-md"
          >
            <DeleteOutlined />
          </button>
          {/* <Popconfirm
            title="Are you sure you want to delete this team?"
            onConfirm={() =>
              deleteTeam(record?._id)
                .unwrap()
                .then((res) => {
                  toast.success(res?.message);
                })
                .catch((err) => {
                  toast.error(err?.data?.message);
                })
            }
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-red-500 border-none text-white text-xl p-2 py-1 rounded-md">
              <DeleteOutlined />
            </button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this team?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteTeam(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        message.success("Player deleted successfully");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete player.",
          icon: "error",
        });
        message.error("Failed to delete player");
      }
    } else {
      message.info("Delete operation canceled");
    }
  };
  const handleDeleteMany = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this team?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      console.log(selectItemId);
      const deleteData = {
        ids: selectItemId,
      };
      console.log(deleteData);

      try {
        await deleteSelect(deleteData).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        message.success("Player deleted successfully");
        setSelectItemId([]);
        setSelectedRowKeys([]);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete player.",
          icon: "error",
        });
        message.error("Failed to delete player");
      }
    } else {
      message.info("Delete operation canceled");
    }
  };

  const handleAdd = () => {
    setSelectedTeam(null);
    setIsAddEditModalVisible(true);
  };

  const handleEdit = (team) => {
    console.log(team);
    setSelectedTeam(team);
    setIsAddEditModalVisible(true);
    form.setFieldsValue({
      name: team?.name,
      league: team?.league?._id,
    });
    setProfileImage(`${url}/${team?.team_logo}`);
    setBgImage(`${url}/${team?.team_bg_image}`);
  };

  const handleTipsDetails = (team) => {
    setSelectedTeam(team);
    setIsTipsDetailsModalVisible(true);
  };

  const handleInvite = (team) => {
    console.log(team);

    setSelectedTeam(team);
    setIsInviteModalVisible(true);
  };

  const handleFinish = (values) => {
    const data = {
      league: values?.league,
      name: values?.name,
    };
    if (values?.teamLogo?.file) {
      data.team_logo = values?.teamLogo?.file;
    }
    if (values?.backgroundImage?.file) {
      data.team_bg_image = values?.backgroundImage?.file;
    }
    const formData = new FormData();
    Object.keys(data)?.map((key) => {
      formData.append(key, data[key]);
    });
    if (selectedTeam?._id) {
      update({ id: selectedTeam?._id, data: formData })
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          form.resetFields();
          setBgImage(null);
          setProfileImage(null);
          setIsAddEditModalVisible(false);
        })
        .catch((err) => {
          toast.error(err?.data?.message);
        });
    } else {
      create(formData)
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          form.resetFields();
          setBgImage(null);
          setProfileImage(null);
          setSelectedTeam(null);
          setIsAddEditModalVisible(false);
        })
        .catch((err) => {
          toast.error(err?.data?.message);
        });
    }
  };
  const SubmitInvite = (value) => {
    invite({ id: selectedTeam?._id, data: value })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        form.resetFields();
        setIsInviteModalVisible(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  const handleCopy = (type) => {
    if (type == "password" && passwordRef?.current) {
      passwordRef.current.select();
      document.execCommand("copy");
      toast.success("password copied successfully");
    } else if (userNameRef?.current) {
      userNameRef.current.select();
      document.execCommand("copy");
      toast.success("username copied successfully");
    }
  };
  const handleTip = () => {
    tip({
      id: selectedTeam?._id,
      data: {
        amount: Number(tipAmount),
      },
    })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setTipAmount(0);
        setIsTipsDetailsModalVisible(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      const selectedIds = selectedRows.map((row) => row._id);
      setSelectItemId(selectedIds);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const tableData =
    data?.data?.result?.map((item, i) => {
      return {
        key: i + 1,
        ...item,
      };
    }) || [];

  // all selected item id
  // console.log(selectItemId);

  return (
    <div className="p-4 h-screen overflow-y-scroll bg-[var(--bg-gray-20)]">
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
          <h4 className="text-lg font-semibold">Team Management</h4>
        </div>
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search here..."
          prefix={<FaSearch />}
          className="mb-6 w-64"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <Button
          disabled={selectItemId?.length === 0}
          icon={deletingSelect ? "" : <PlusOutlined className="rotate-45" />}
          onClick={handleDeleteMany}
          className={`bg-red-500 mb-3 ${
            selectItemId?.length === 0 ? "cursor-not-allowed" : ""
          }`}
        >
          {deletingSelect ? <Spin size="small" /> : "Delete Selected"}
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-green-500 mb-3"
        >
          Add
        </Button>
      </div>
      <Table
        loading={
          isLoading ||
          isFetching ||
          creating ||
          deleting ||
          updating ||
          inviting ||
          tipping
        }
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        dataSource={tableData}
        columns={columns}
        rowKey="key"
        pagination={{
          position: ["bottomCenter"],
          pageSize: data?.data?.meta?.limit,
          total: data?.data?.meta?.total,
          onChange: (page) => setPage(page),
          showSizeChanger: false,
        }}
      />

      <Modal
        open={isAddEditModalVisible}
        onCancel={() => setIsAddEditModalVisible(false)}
        footer={null}
        centered
      >
        <h2 className="text-center font-semibold text-lg mb-6">
          {selectedTeam ? "Edit Team" : "Add Team"}
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={selectedTeam || {}}
        >
          <Form.Item name="name" label="Team Name" rules={[{ required: true }]}>
            <Input placeholder="Enter team name" />
          </Form.Item>
          <Form.Item name="league" label="League" rules={[{ required: true }]}>
            <Select showSearch placeholder="Select league">
              {leagueData?.data?.result?.map((item) => (
                <Select.Option key={item?._id} value={item?._id}>
                  {item?.name}
                </Select.Option>
              ))}
              {/* Add more options */}
            </Select>
          </Form.Item>
          {/* <Form.Item name="sport" label="Sport" rules={[{ required: true }]}>
                        <Input placeholder="Enter sport type" />
                    </Form.Item> */}
          <Form.Item label="Team Logo" name="teamLogo">
            <Upload
              onChange={(info) =>
                setProfileImage(URL.createObjectURL(info.file))
              }
              listType="picture-card"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
            >
              {profileImage ? (
                <div className="relative">
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
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <CameraOutlined className="text-green-500 mb-2" />
                  <span className="text-green-500">Change Logo</span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="Background Image" name="backgroundImage">
            <Upload
              onChange={(info) => setBgImage(URL.createObjectURL(info.file))}
              listType="picture-card"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
            >
              {BgImage ? (
                <div className="relative">
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
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <CameraOutlined className="text-green-500 mb-2" />
                  <span className="text-green-500">Change image</span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setIsAddEditModalVisible(false)}
              className="text-green-500 border-green-500"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-green-500">
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Tips Details Modal */}
      <Modal
        visible={isTipsDetailsModalVisible}
        onCancel={() => setIsTipsDetailsModalVisible(false)}
        footer={null}
        centered
      >
        <h2 className="text-center font-semibold text-lg mb-6">Tips Details</h2>
        <div className="space-y-4">
          <p>
            Total Tips:{" "}
            <span className="float-right">{selectedTeam?.totalTips}</span>
          </p>
          <p>
            Paid Amount:{" "}
            <span className="float-right">{selectedTeam?.paidAmount}</span>
          </p>
          <p>
            Due: <span className="float-right">{selectedTeam?.dueAmount}</span>
          </p>
          <p>send money</p>
          <Input
            value={tipAmount}
            onChange={(e) => setTipAmount(e?.target?.value)}
            type="number"
            placeholder="Enter Amount"
          />
          <Button
            onClick={() => handleTip()}
            type="primary"
            className="w-full mt-4 bg-green-500"
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <Modal
        visible={isInviteModalVisible}
        onCancel={() => setIsInviteModalVisible(false)}
        footer={null}
        centered
      >
        <h2 className="text-center font-semibold text-lg mb-6">
          Invite Credential
        </h2>
        <Form
          form={form}
          onFinish={SubmitInvite}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            rules={[
              {
                message: "username is required",
                required: true,
              },
            ]}
            name={`username`}
            label="User Name"
          >
            <Input
              ref={userNameRef}
              addonAfter={
                <button onClick={() => handleCopy("username")} type="button">
                  <CopyOutlined />
                </button>
              }
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                message: "password is required",
                required: true,
              },
            ]}
            name={`password`}
            label="Password"
          >
            <Input
              ref={passwordRef}
              addonAfter={
                <button onClick={() => handleCopy("password")} type="button">
                  <CopyOutlined />
                </button>
              }
            />
          </Form.Item>
          <Button htmlType="submit">Save Credential</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamManagement;
