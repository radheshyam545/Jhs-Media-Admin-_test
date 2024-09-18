import React, { useState } from 'react';
import { Space, Table, Tooltip, Modal, Button } from 'antd';
import { AiOutlineEye, AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFile } from 'react-icons/ai'; // Importing icons for file types

const columns = (showMessageModal) => [
  {
    title: 'S.No.',
    key: 'name',
    width: 80,  // Fixed width for this column
    render: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: 'Full Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,  // Fixed width for this column
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 150,  // Fixed width for this column
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 200,  // Fixed width for this column
  },
  {
    title: 'Phone Number',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber',
    width: 150,  // Fixed width for this column
  },
  {
    title: 'Message',
    key: 'message',
    width: 150,  // Fixed width for this column
    render: (_, record) => {
      const message = record.message || '';
      return (
        <Space size="middle">
          <Tooltip title={message.slice(0, 5) + '...'}>
            {message.length > 5 ? message.slice(0, 5) + '...' : message}
          </Tooltip>
          {/* View Icon which will open the modal */}
          <AiOutlineEye style={{ cursor: 'pointer' }} onClick={() => showMessageModal(record.message)} />
        </Space>
      );
    },
  },
  {
    title: 'Upload File',
    key: 'upload',
    width: 150,  // Fixed width for this column
    render: (_, record) => {
      const fileType = record.fileType || 'none';
      
      // Determine the icon and label based on the file type
      let fileIcon;
      let fileLabel;

      switch (fileType) {
        case 'image':
          fileIcon = <AiOutlineFileImage />;
          fileLabel = 'Image';
          break;
        case 'pdf':
          fileIcon = <AiOutlineFilePdf />;
          fileLabel = 'PDF';
          break;
        case 'none':
        default:
          fileIcon = <AiOutlineFile />;  // Default no file icon
          fileLabel = 'No File';
          break;
      }

      return (
        <Space size="middle">
          {fileIcon} {fileLabel}
        </Space>
      );
    },
  },
];

// Dummy data to showcase in the table
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    email: 'john.brown@example.com',
    phoneNumber: '123-456-7890',
    message: 'Working on a project',
    fileType: 'image',  // Example file type
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    email: 'jim.green@example.com',
    phoneNumber: '987-654-3210',
    message: 'Retired',
    fileType: 'pdf',  // Example file type
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 29,
    email: 'joe.black@example.com',
    phoneNumber: '555-123-4567',
    message: 'Available for hire',
    fileType: 'none',  // No file uploaded
  },
  {
    key: '4',
    name: 'Jane Doe',
    age: 34,
    email: 'jane.doe@example.com',
    phoneNumber: '444-555-6666',
    message: 'Managing a team',
    fileType: 'image',  // Example file type
  },
  {
    key: '5',
    name: 'Alice Smith',
    age: 27,
    email: 'alice.smith@example.com',
    phoneNumber: '321-654-9870',
    message: 'Currently traveling',
    fileType: 'pdf',  // Example file type
  },
  {
    key: '6',
    name: 'Bob White',
    age: 50,
    email: 'bob.white@example.com',
    phoneNumber: '999-888-7777',
    message: 'Mentoring juniors',
    fileType: 'none',  // No file uploaded
  },
];

const TableComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Function to show the modal and set the message content
  const showMessageModal = (message) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Table
        columns={columns(showMessageModal)}
        dataSource={data}
        scroll={{ x: 1000 }}  // Enable horizontal scrolling
        pagination={{
          pageSize: 5, // Set the number of rows per page to 5
        }}
      />
      {/* Modal to show the full message */}
      <Modal
        title="Full Message"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default TableComponent;
