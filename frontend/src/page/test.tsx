import React from 'react';
import { Divider, Button } from "antd";
import { Routes, Route, Link } from "react-router-dom";

import Ticket from "../../page/Ticket/ticket";

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

const titleStyle: React.CSSProperties = {
  fontSize: '1.5em',  // ขนาดตัวหนังสือใหญ่ขึ้น
  fontWeight: 'bold', // ทำให้ตัวหนังสือหนา
  color: 'black',     // สีตัวหนังสือเป็นขาว
  marginBottom: '8px', // เพิ่มช่องว่างด้านล่าง
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '1.2em',  // ขนาดตัวหนังสือ
  color: 'black',      // สีตัวหนังสือเป็นขาว
  marginBottom: '8px', // เพิ่มช่องว่างด้านล่าง
};

const priceStyle: React.CSSProperties = {
  fontSize: '1.2em',  // ขนาดตัวหนังสือ
  fontWeight: 'bold', // ทำให้ตัวหนังสือหนา
  color: '#FFD700',   // สีตัวหนังสือทอง
};

const userpage: React.FC = () => {
  const [value, setValue] = React.useState<string>('horizontal');
  
  // กำหนดข้อมูลหลายประเภทในแต่ละกล่อง
  const boxesData = [
    { title: "Single", description: "Zone A", price: "80 Baht" },
    { title: "Double", description: "Zone A , B", price: "130 Baht" },
    { title: "Triple", description: "Zone A , B , C", price: "180 Baht" },
  ];

  return (
    <div 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
      }}
    > 

      <div 
        style={{ 
          display: 'flex', 
          flexDirection: value === 'vertical' ? 'column' : 'row',
          gap: '10px',
        }}
      >
        {boxesData.map((box, i) => (
          <div 
            key={i} 
            style={{ 
              ...baseStyle, 
              backgroundColor: i % 2 ? '#FFFAFA' : '#FFFAFA' 
            }} 
          >
            <br />
            <div style={titleStyle}>{box.title} </div>
            <Divider />
            <br />
            <div style={descriptionStyle}>{box.description}</div>
            <div style={priceStyle}>{box.price}</div>
            <Button type="primary">
              <Link to="/Ticket"><span>หอพักชาย 2</span></Link>
            </Button>
          </div>
        ))}
      </div>
        <div>
          <Routes>
            <Route path="/ticket" element={<Ticket />} />
          </Routes>
        </div>
    </div>
  );
};

export default userpage;