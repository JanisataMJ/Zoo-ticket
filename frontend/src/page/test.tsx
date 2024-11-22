import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Rent.css";

const ImageGallery: React.FC = () => {
  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150/FF0000",
    "https://via.placeholder.com/150/00FF00",
    "https://via.placeholder.com/150/0000FF",
    "https://via.placeholder.com/150/FFFF00",
    "https://via.placeholder.com/150/FF00FF",
    "https://via.placeholder.com/150/00FFFF",
  ];

  return (
    <div className="container">
      <div className="text"><div>message</div><div>go</div></div>
      <div className="gallery-container">
        <div className="image-row">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Gallery ${index}`} className="image" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Rent: React.FC = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || "No date selected";

  // สร้างตัวเลือกเวลา
  const availableTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const [selectedTime, setSelectedTime] = useState<string>("08:00");

  // คำนวณเวลาเริ่มต้นและสิ้นสุด
  const startTime = new Date();
  const [hours] = selectedTime.split(":").map(Number);
  startTime.setHours(hours, 0, 0);

  const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

  return (
    <div>
      <h1>Rent</h1>
      <p>Selected Date: {selectedDate}</p>
      <label htmlFor="timePicker">Select Time: </label>
      <select
        id="timePicker"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <p>
        Period Time:{" "}
        {startTime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}{" "}
        -{" "}{endTime.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
      </p>
      <div>Golf Cart </div>
      <ImageGallery />
    </div>
  );
};

export default Rent;


