import React from 'react'
import { Button, Modal, DatePicker, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const Booked = () => {
    const [modal, contextHolder] = Modal.useModal();

  const paid = () => {
    modal.confirm({
      title: 'การจองสำเร็จ',
      //icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: <Link to="/">Confirm</Link>,
      cancelText: 'Cancel',
    });
  };

  const deleteticket = () => {
    modal.confirm({
      title: 'ยืนยันการลบ',
      //icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      cancelText: 'Cancel',
    });
  };

  return (
    <>
    Booked
      <Space>
        <Button onClick={paid}>ชำระเงิน</Button>
        <Button onClick={deleteticket}>ลบ</Button>
      </Space>
      {contextHolder}
    </>
  );
}

export default Booked;
