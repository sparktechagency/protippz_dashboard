import { Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { useUploadCsvMutation } from '../../Redux/Apis/manageApis';
import { PlusOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const UploadCsv = ({ setOpenCsv }) => {
    const [upload] = useUploadCsvMutation();
    const handleUpload = (file) => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return false;
        }
        const formData = new FormData();
        formData.append('file', file);

        upload(formData)
            .unwrap()
            .then((response) => {
                toast.success('File uploaded successfully!');
            })
            .catch((error) => {
                toast.error('File upload failed.');
            });
    };


    return (
        <div className="space-y-4">
            <Upload.Dragger
                name="file"
                accept='.csv'
                beforeUpload={handleUpload}
                showUploadList={false}
                className="border-dashed rounded-lg"
            >
                <div className="flex flex-col items-center text-green-500">
                    <PlusOutlined className="text-2xl mb-2" />
                    <span>Add CSV File</span>
                </div>
            </Upload.Dragger>
            <button
                type="button"
                className="w-full bg-green-500 mt-4 py-2 rounded-md text-white"
                onClick={() => {
                    setOpenCsv(false);
                }}
            >
                Close
            </button>
        </div>
    );
};

export default UploadCsv;
