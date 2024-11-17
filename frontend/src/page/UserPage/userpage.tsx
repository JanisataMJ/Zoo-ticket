import React from 'react';
import { Divider, Button } from "antd";
import { Link } from "react-router-dom";

const baseStyle: React.CSSProperties = {
  width: '25vw',  // ขนาดของช่องสี่เหลี่ยม
  height: '80vh', // ใช้ 40% ของความสูงของหน้าต่าง
  minWidth: '200px',
  minHeight: '200px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bold',
  textAlign: 'center',
  flexDirection: 'column', // แสดงข้อมูลในแนวตั้ง
  borderRadius: '5px',
  border : '1px solid #DCDCDC',
};

const UserPage: React.FC = () => {
  const boxesData = [
    { title: "Single", description: "Zone A", price: "80 Baht" },
    { title: "Double", description: "Zone A , B", price: "130 Baht" },
    { title: "Triple", description: "Zone A , B , C", price: "180 Baht" },
  ];

  return (
    <>
      <Button type="text">
        <Link to="/vehicle">Vehicle for employee</Link>
      </Button>
      <div 
        style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
      > 
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          {boxesData.map((box, i) => (
            <div key={i} style={{ ...baseStyle, backgroundColor: i % 2 ? '#FFFAFA' : '#FFFAFA' }}>
              <br />
              <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'black', marginBottom: '8px' }}>{box.title}</div>
              <Divider />
              <br />
              <div style={{ fontSize: '1.2em', color: 'black', marginBottom: '8px' }}>{box.description}</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#FFD700' }}>{box.price}</div>
              <Button type="primary">
                <Link to="/ticket">Choose</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
    
  );
};

export default UserPage;
