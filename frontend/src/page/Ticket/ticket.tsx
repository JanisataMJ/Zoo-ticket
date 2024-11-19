import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, DatePicker, Space } from 'antd';
import { Link } from "react-router-dom";

const Calendar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // เก็บวันที่ที่เลือก

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDateSelect = (date: any) => {
    const formattedDate = date?.format("YYYY-MM-DD");
    setSelectedDate(formattedDate); // เก็บวันที่ที่เลือก
    console.log("Selected date:", formattedDate);
    setIsModalOpen(false); // ปิด Modal เมื่อเลือกวันที่แล้ว
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Calendar
      </Button>
      <Modal
        title="Select a Date"
        open={isModalOpen}
        footer={null} // ลบปุ่มยืนยันและยกเลิก
        onCancel={() => setIsModalOpen(false)} // ปิด Modal เมื่อคลิกที่ด้านนอก
      >
        <DatePicker 
          onChange={handleDateSelect} // ปิด Modal เมื่อเลือกวันที่
          style={{ width: '100%' }} // ขยายปฏิทินให้เต็มความกว้าง
        />
      </Modal>
      
      {/* แสดงวันที่ที่เลือก */}
      {selectedDate && <p>Selected Date: {selectedDate}</p>}
    </>
  );
};

const Ticket: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: <Link to="/rent">Rent</Link>,
      cancelText: <Link to="/booked">No,Thanks</Link>,
      closable: true, // เพิ่มกากบาทปิดมุมขวาบน
      onCancel: () => {
        console.log('Modal closed');
      },
    });
  };

  return (
    <>
      <Space>
        <Calendar />
        <Button onClick={confirm}>Confirm</Button>
      </Space>
      {contextHolder}
    </>
  );
};

export default Ticket;