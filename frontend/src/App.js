import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusList from './components/BusList';
import AddBus from './components/add/AddBus';
import CrewList from './components/CrewList';
import RouteList from './components/RouteList';
import ScheduleList from './components/ScheduleList';
import Navbar from './components/ui/navBar';
import StopList from './components/BusStop';
import AddRoute from './components/add/AddRoutes';
import AddBusStop from './components/add/AddBusStop';
import AddCrew from './components/add/AddCrew';
import AddSchedule from './components/add/AddSchedules';

function App() {
  return (
    <Router>
      <div>
        <h1>DTC Bus Management System</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<h2>Welcome to the DTC Bus Management System</h2>} />
          <Route path="/buses" element={<BusList />} />
          <Route path="/add-bus" element={<AddBus />} />
          <Route path="/add-route" element={<AddRoute />} />
          <Route path="/add-stop" element={<AddBusStop />} />
          <Route path="/add-crew" element={<AddCrew />} />
          <Route path="/add-schedule" element={<AddSchedule />} />
          <Route path="/crews" element={<CrewList />} />
          <Route path="/routes" element={<RouteList />} />
          <Route path="/schedules" element={<ScheduleList />} />
          <Route path="/bus-stops" element={<StopList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
