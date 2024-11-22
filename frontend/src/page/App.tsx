// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from '../page/UserPage/userpage';
import Ticket from '../page/Ticket/ticket';
import Rent from '../page/Rent/rent';
import MyTicket from '../page/Ticket/myticket';
import Booked from '../page/Ticket/booked';
import TopBar from '../page/Vehicle/topbar';
import Vehicle from '../page/Vehicle/vehicle';
import Create from '../page/Vehicle/create';
import Rental from '../page/Vehicle/rental';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/myticket" element={<MyTicket />} />
        <Route path="/booked" element={<Booked />} />
        <Route element={<TopBar />}>
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
