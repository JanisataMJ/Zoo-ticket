import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, TreeSelect, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UpdateVehicle, GetVehicleById } from '../../services/https'; // API Service functions
import { useParams, useNavigate } from 'react-router-dom';
import { VehicleInterface } from "../../interface/IVehicle";
import moment from 'moment';

const Update = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [vehicleData, setVehicleData] = useState<VehicleInterface | null>(null); // Store vehicle data
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const getVehicleById = async () => {
    try {
      if (id) {
        const res = await GetVehicleById(Number(id));
        if (res) {
          setVehicleData(res);
          form.setFieldsValue({
            Name: res.Name,
            PriceForRent: res.Price,
            QuantityVehicle: res.QuantityVehicle,
            ReceivedDate: moment(res.ReceivedDate),
            Status: res.AvaliabilityStatus,
            Type: res.VehicleTypeID,
            EmployeeID: res.EmployeeID,
          });
          if (res.Picture) {
            setFileList([
              {
                uid: '-1',
                name: res.Picture,
                status: 'done',
                url: `http://localhost:8000/uploads/${res.Picture}`,
              },
            ]);
          }
        }
      }
    } catch (error) {
      messageApi.open({ type: 'error', content: 'Failed to fetch vehicle data' });
    }
  };

  useEffect(() => {
    getVehicleById();
  }, [id]);

  const onChange = ({ fileList: newFileList }: any) => setFileList(newFileList);

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="max-width: 100%;" />`);
  };

  const beforeUpload = (file: any) => {
    setFileList([file]);
    return false; // Prevent default upload
  };

  const onFinish = async (values: any) => {
    if (!vehicleData) {
      messageApi.open({ type: 'error', content: 'Vehicle data not loaded properly.' });
      return;
    }

    if (fileList.length === 0) {
      message.error('Please upload a picture');
      return;
    }

    const formData = new FormData();
    formData.append('ID', String(vehicleData.ID));
    formData.append('Name', values.Name);
    formData.append('PriceForRent', String(values.PriceForRent));
    formData.append('QuantityVehicle', String(values.QuantityVehicle));
    formData.append('ReceivedDate', values.ReceivedDate.format('YYYY-MM-DD'));
    formData.append('Status', values.Status);
    formData.append('Type', values.Type);
    formData.append('EmployeeID', String(values.EmployeeID));

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('picture', fileList[0].originFileObj);
    }

    try {
        await UpdateVehicle(formData);
        message.success('Vehicle updated successfully!');
        navigate('/'); // เปลี่ยนเส้นทางหลังสำเร็จ
    } catch (error) {
        message.error('Failed to update vehicle.');
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Upload Picture"
          name="picture"
          valuePropName="fileList"
          rules={[{ required: true, message: "Please upload a picture" }]}
        >
          <ImgCrop rotationSlider>
            <Upload
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={beforeUpload}
              maxCount={1}
              listType="picture-card"
            >
              {fileList.length < 1 && <div>Upload</div>}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item label="ชื่อ" name="Name" rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="ราคาเช่า" name="PriceForRent" rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="จำนวน" name="QuantityVehicle" rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="วันที่รับรถ" name="ReceivedDate" rules={[{ required: true, message: 'กรุณาเลือกวันที่!' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="สถานะ" name="Status">
          <Input />
        </Form.Item>
        <Form.Item label="ประเภท" name="Type">
          <Select>
            <Select.Option value="1">รถเก๋ง</Select.Option>
            <Select.Option value="2">รถกระบะ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="พนักงาน" name="EmployeeID">
          <InputNumber min={1} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          อัปเดต
        </Button>
      </Form>
    </>
  );
};

export default Update;
