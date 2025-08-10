/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Upload,
  Select,
  message,
  Image,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CameraOutlined,
  ArrowLeftOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  useGetAllRewardsQuery,
  useCreateRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
} from '../../Redux/Apis/rewardApis';
import {
  useGetAllRewardCategoriesQuery,
  useCreateRewardCategoryMutation,
  useUpdateRewardCategoryMutation,
  useDeleteRewardCategoryMutation,
} from '../../Redux/Apis/rewardCategoryApis';
import { imageUrl } from '../../Utils/BaseUrl';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const RewardManagement = () => {
  const [page, setPage] = useState(1);
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [selectedView, setSelectedView] = useState('Reward');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();

  const [categoryImage, setCategoryImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState();

  const { data: rewardData, isLoading: isLoadingRewards } =
    useGetAllRewardsQuery({ searchTerm, page: page, limit: 30 });
  const { data: categoryData, isLoading: isLoadingCategories } =
    useGetAllRewardCategoriesQuery({ searchTerm, page: 1, limit: 30 });

  const [createReward] = useCreateRewardMutation();
  const [updateReward] = useUpdateRewardMutation();
  const [deleteReward] = useDeleteRewardMutation();

  const [createRewardCategory] = useCreateRewardCategoryMutation();
  const [updateRewardCategory] = useUpdateRewardCategoryMutation();
  const [deleteRewardCategory] = useDeleteRewardCategoryMutation();

  const rewardColumns = [
    { title: 'Reward Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => `${category?.name}`,
    },
    {
      title: 'Points Required',
      dataIndex: 'pointRequired',
      key: 'pointRequired',
      render: (pointRequired) =>
        `${new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(pointRequired)}`,
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Image',
      dataIndex: 'reward_image',
      key: 'reward_image',
      render: (reward_image) => (
        <img
          src={`${imageUrl(reward_image)}`}
          alt="reward"
          className="w-10 h-10"
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(record)}
            className="bg-green-500 text-white text-xl p-2 py-1 rounded-md"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => handleDeleteReward(record?.id)}
            className="bg-red-500 text-white text-xl p-2 py-1 rounded-md"
          >
            <DeleteOutlined />
          </button>
          {/* <Popconfirm
            title="Are you sure you want to delete this Player?"
            onConfirm={() =>
              handleDeleteReward(record?._id)
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

  const categoryColumns = [
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Delivery Option',
      dataIndex: 'deliveryOption',
      key: 'deliveryOption',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={`${imageUrl(image)}`} alt="category" className="w-10 h-10" />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(record)}
            className="bg-green-500 text-white text-xl p-2 py-1 rounded-md"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => handleDeleteCategory(record?.id)}
            className="bg-red-500 text-white text-xl p-2 py-1 rounded-md"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setSelectedRecord(null);
    setIsAddEditModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsAddEditModalVisible(true);
    // form.setFieldsValue(record);
    if (selectedView === 'Category') {
      form.setFieldsValue({
        categoryName: record?.name,
        deliveryOption: record?.deliveryOption,
      });
      setCategoryImage(`${imageUrl(record?.image)}`);
    } else {
      form.setFieldsValue({
        name: record?.name,
        category: record?.category?._id,
        pointRequired: Number(record?.pointRequired),
        description: record?.description,
      });
      setCategoryImage(`${imageUrl(record?.reward_image)}`);
    }
  };

  //   await deleteReward(id).unwrap();
  //   const handleDeleteReward = async (id) => {
  //     try {
  //       await deleteReward(id).unwrap();
  //       message.success("Reward deleted successfully");
  //     } catch (error) {
  //       message.error("Failed to delete reward");
  //     }
  //   };
  const handleDeleteReward = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteReward(id).unwrap();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        message.success('Player deleted successfully');
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete player.',
          icon: 'error',
        });
        message.error('Failed to delete player');
      }
    } else {
      message.info('Delete operation canceled');
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      await deleteRewardCategory(id).unwrap();
      message.success('Category deleted successfully');
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const handleFinish = async (values) => {
    try {
      if (selectedView === 'Reward') {
        const data = {
          name: values?.name,
          category: values?.category,
          pointRequired: Number(values?.pointRequired),
          description: values?.description,
        };
        if (values?.category_image?.file) {
          data.reward_image = values?.category_image?.file;
        }
        const formData = new FormData();
        Object.keys(data)?.map((key) => {
          formData.append(key, data[key]);
        });
        if (selectedRecord) {
          updateReward({ id: selectedRecord?._id, data: formData })
            .unwrap()
            .then((res) => {
              toast.success(res?.message);
              form.resetFields();
              setCategoryImage(null);
              setIsAddEditModalVisible(false);
            })
            .catch((err) => {
              toast.error(err?.data?.message);
            });
        } else {
          createReward(formData)
            .unwrap()
            .then((res) => {
              toast.success(res?.message);
              form.resetFields();
              setCategoryImage(null);
              setIsAddEditModalVisible(false);
            })
            .catch((err) => {
              toast.error(err?.data?.message);
            });
        }
      } else if (selectedView === 'Category') {
        const data = {
          name: values?.categoryName,
          deliveryOption: values?.deliveryOption,
        };
        if (values?.category_image?.file) {
          data.category_image = values?.category_image?.file;
        }
        const formData = new FormData();
        Object.keys(data)?.map((key) => {
          formData.append(key, data[key]);
        });
        if (selectedRecord) {
          updateRewardCategory({ id: selectedRecord?._id, data: formData })
            .unwrap()
            .then((res) => {
              toast.success(res?.message);
              form.resetFields();
              setCategoryImage(null);
              setIsAddEditModalVisible(false);
            })
            .catch((err) => {
              toast.error(err?.data?.message);
            });
        } else {
          createRewardCategory(formData)
            .unwrap()
            .then((res) => {
              toast.success(res?.message);
              form.resetFields();
              setCategoryImage(null);
              setIsAddEditModalVisible(false);
            })
            .catch((err) => {
              toast.error(err?.data?.message);
            });
        }
      }
    } catch (error) {
      message.error('Failed to save');
    }
  };
  const pagination = {
    position: ['bottomCenter'],
    total:
      selectedView === 'Reward'
        ? rewardData?.data?.meta?.total || 0
        : categoryData?.data?.meta?.total || 0,
    pageSize: 30,
    showSizeChanger: false,
    responsive: true,
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} out of ${total}`,
    onChange: (page) => setPage(page),
  };
  return (
    <div className="p-4 h-[80vh] overflow-y-scroll bg-[var(--bg-gray-20)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Link to={-1}>
            <ArrowLeftOutlined
              style={{
                color: '#52c41a',
                fontSize: '18px',
                cursor: 'pointer',
                marginRight: '8px',
              }}
            />
          </Link>
          <h4 className="text-lg font-semibold">Reward Management</h4>
        </div>
        <Input
          onChange={(e) => setSearchTerm(e?.target?.value)}
          placeholder="Search here..."
          prefix={<FaSearch />}
          className="w-64"
        />
      </div>
      <div className="flex space-x-2 mb-3">
        <button
          className={`${selectedView === 'Reward'
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-500'
            } px-4 rounded-md py-1`}
          onClick={() => setSelectedView('Reward')}
        >
          Reward
        </button>
        <button
          className={`${selectedView === 'Category'
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-500'
            } px-4 rounded-md py-1`}
          onClick={() => setSelectedView('Category')}
        >
          Category
        </button>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="bg-green-500 mb-3"
      >
        Add
      </Button>

      {/* meta: { page: 1, limit: 10, total: 26, totalPage: 3 } */}
      <Table
        scroll={{ x: 'max-content' }}
        dataSource={
          selectedView === 'Reward'
            ? rewardData?.data?.result
            : categoryData?.data?.result
        }
        columns={selectedView === 'Reward' ? rewardColumns : categoryColumns}
        rowKey="id"
        loading={isLoadingRewards || isLoadingCategories}
        pagination={pagination}
      />
      <Modal
        visible={isAddEditModalVisible}
        onCancel={() => setIsAddEditModalVisible(false)}
        footer={null}
        centered
      >
        <h2 className="text-center font-semibold text-lg mb-6">
          {selectedRecord ? 'Edit' : 'Add'} {selectedView}
        </h2>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {selectedView === 'Reward' && (
            <>
              <Form.Item
                name="name"
                label="Reward Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter reward name" />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select showSearch placeholder="Select category">
                  {categoryData?.data?.result?.map((item) => (
                    <Select.Option key={item?._id} value={item?._id}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="pointRequired"
                label="Points Required"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter points required" type="number" />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  style={{
                    resize: 'none',
                  }}
                  placeholder="Enter description"
                />
              </Form.Item>
            </>
          )}
          {selectedView === 'Category' && (
            <>
              <Form.Item
                name="categoryName"
                label="Category Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter category name" />
              </Form.Item>
              <Form.Item
                name="deliveryOption"
                label="delivery Option"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: 'Email', value: 'Email' },
                    { label: 'Shipping Address', value: 'Shipping Address' },
                  ]}
                />
              </Form.Item>
            </>
          )}
          <Form.Item label="Image" name="category_image">
            <Upload
              onChange={(info) =>
                setCategoryImage(URL.createObjectURL(info.file))
              }
              listType="picture-card"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
            >
              {categoryImage ? (
                <div className="relative">
                  <Image
                    width={100}
                    src={categoryImage}
                    alt="Preview"
                    preview={false}
                  />
                  <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={() => setCategoryImage(null)}
                    className="absolute top-0 right-0 text-red-500"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <CameraOutlined className="text-green-500 mb-2" />
                  <span className="text-green-500">category</span>
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
    </div>
  );
};

export default RewardManagement;
