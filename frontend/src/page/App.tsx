/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "../page/UserPage/userpage";
import Ticket from "../page/Ticket/ticket";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/ticket" element={<Ticket />} />
    </Routes>
  </Router>
);

export default App;*/


// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from '../page/UserPage/userpage';
import Ticket from '../page/Ticket/ticket';
import Rent from '../page/Rent/rent';
import MyTicket from '../page/Ticket/myticket';
import Booked from '../page/Ticket/booked';
import Vehicle from '../page/Vehicle/vehicle';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/myticket" element={<MyTicket />} />
        <Route path="/booked" element={<Booked />} />
        <Route path="/vehicle" element={<Vehicle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
