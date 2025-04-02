/* eslint-disable react/prop-types */
// import { Spin, Upload } from 'antd';
// import React, { useState, useEffect } from 'react';
// import { useUploadCsvMutation } from '../../Redux/Apis/manageApis';
// import { PlusOutlined } from '@ant-design/icons';
// import toast from 'react-hot-toast';

// const UploadCsv = ({ setOpenCsv }) => {
//     const [upload, { isLoading }] = useUploadCsvMutation();
//     const handleUpload = (file) => {
//         if (!file) {
//             setMessage('Please select a file to upload.');
//             return false;
//         }
//         const formData = new FormData();
//         formData.append('file', file);

//         upload(formData)
//             .unwrap()
//             .then((response) => {
//                 toast.success(response);
//             })
//             .catch((error) => {
//                 toast.error(error?.data);
//             });
//     };

//     return (
//         <div className="space-y-4">
//             <Upload.Dragger
//                 name="file"
//                 accept='.csv'
//                 beforeUpload={handleUpload}
//                 showUploadList={false}
//                 className="border-dashed rounded-lg"
//             >
//                 {
//                     isLoading ? <Spin /> : <div className="flex flex-col items-center text-green-500">
//                         <PlusOutlined className="text-2xl mb-2" />
//                         <span>Add CSV File</span>
//                     </div>
//                 }

//             </Upload.Dragger>
//             <button
//                 type="button"
//                 className="w-full bg-green-500 mt-4 py-2 rounded-md text-white"
//                 onClick={() => {
//                     setOpenCsv(false);
//                 }}
//             >
//                 Close
//             </button>
//         </div>
//     );
// };

// export default UploadCsv;

import { Progress, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useUploadCsvMutation } from '../../Redux/Apis/manageApis';
import { PlusOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useSocket } from '../../Context/SocketContext';

const UploadCsv = ({ setOpenCsv }) => {
  const [upload, { isLoading }] = useUploadCsvMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const { socket, onlineUser } = useSocket();
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
  });

  useEffect(() => {
    if (socket) {
      socket.on('upload-progress', (data) => {
        setProgress(data);
      });
    }
  }, [socket, onlineUser]);

  const handleFileSelect = (file) => {
    const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');
    if (!isCsv) {
      setMessage('Only CSV files are allowed.');
      toast.error('Only CSV files are allowed.');
      return false;
    }

    setMessage('');
    setSelectedFile(file);
    return false;
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await upload(formData).unwrap();
      if (res?.data) {
        toast.success(res?.data || 'File uploaded successfully!');
        setSelectedFile(null);
        setOpenCsv(false);
        setProgress({
          completed: 0,
          total: 0,
        });
        setSelectedFile(null);
        window.reload();
      }
    } catch (error) {
      toast.success(error?.data || 'Upload failed.');
      setOpenCsv(false);
      setProgress({
        completed: 0,
        total: 0,
      });
      setSelectedFile(null);
      window.reload();
    }
  };

  const progressPercent = (progress?.completed / progress?.total) * 100;
  return (
    <div className="space-y-4">
      <Upload.Dragger
        name="file"
        accept=".csv"
        beforeUpload={handleFileSelect}
        showUploadList={false}
        className="border-dashed rounded-lg"
      >
        {isLoading ? (
          <div>
            <p className="text-2xl mb-2">Uploading progress</p>
            <p className="text-xl font-bold">
              <span className="text-green-500">{progress?.completed}</span> /
              <span className="text-blue-600">{progress?.total}</span>
            </p>
            <Progress
              strokeLinecap="butt"
              strokeColor={'#22C55E'}
              percent={progressPercent}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center text-green-500">
            <PlusOutlined className="text-2xl mb-2" />
            <span>{selectedFile ? 'File Selected' : 'Add CSV File'}</span>
          </div>
        )}
      </Upload.Dragger>
      {message && <p className="text-red-500">{message}</p>}
      {selectedFile && (
        <div className="text-green-500">
          <p>Selected File: {selectedFile.name}</p>
          <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      <button
        type="button"
        className="w-full bg-green-500 mt-4 py-2 rounded-md text-white"
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload File'}
      </button>
      <button
        type="button"
        className="w-full bg-gray-500 mt-4 py-2 rounded-md text-white"
        onClick={() => {
          setSelectedFile(null);
          setOpenCsv(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default UploadCsv;
