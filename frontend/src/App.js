import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import the updated CSS
import BusList from './components/BusList';
import AddBus from './components/add/AddBus';
import CrewList from './components/CrewList';
import RouteList from './components/RouteList';
import ScheduleList from './components/ScheduleList';
import Navbar from './components/ui/NavBar';
import StopList from './components/BusStopList';
import AddRoute from './components/add/AddRoutes';
import AddBusStop from './components/add/AddBusStop';
import AddCrew from './components/add/AddCrew';
import AddSchedule from './components/add/AddSchedules';
import EditBus from './components/edit/EditBus';
import EditBusStop from './components/edit/EditBusStop';
import EditCrew from './components/edit/EditCrew';
import EditRoute from './components/edit/EditRoute';
import EditSchedule from './components/edit/EditSchedule';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="header-container">
          <h1 className="header">DTC Bus Management System</h1>
          <p className="subheading">Efficient scheduling and management at your fingertips</p>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<h2 className="welcome">Welcome to the DTC Bus Management System</h2>} />
          {/* Main list components path */}
          <Route path="/buses" element={<BusList />} />
          <Route path="/crews" element={<CrewList />} />
          <Route path="/routes" element={<RouteList />} />
          <Route path="/schedules" element={<ScheduleList />} />
          <Route path="/bus-stops" element={<StopList />} />
          {/* Add components path */}
          <Route path="/add-bus" element={<AddBus />} />
          <Route path="/add-route" element={<AddRoute />} />
          <Route path="/add-stop" element={<AddBusStop />} />
          <Route path="/add-crew" element={<AddCrew />} />
          <Route path="/add-schedule" element={<AddSchedule />} />
          {/* Edit components path */}
          <Route path="/edit-bus/:id" element={<EditBus />} />
          <Route path="/edit-busstop/:id" element={<EditBusStop />} />
          <Route path="/edit-crew/:id" element={<EditCrew />} />
          <Route path="/edit-route/:id" element={<EditRoute />} />
          <Route path="/edit-schedule/:id" element={<EditSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
