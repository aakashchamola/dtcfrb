import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BusList from './components/BusList';
import AddBus from './components/AddBus';
import CrewList from './components/CrewList';
import RouteList from './components/RouteList';
import ScheduleList from './components/ScheduleList';

function App() {
  return (
    <Router>
      <div>
        <h1>DTC Bus Management System</h1>
        <Routes>
          <Route path="/buses" component={BusList} />
          <Route path="/add-bus" component={AddBus} />
          <Route path="/crew" component={CrewList} />
          <Route path="/routes" component={RouteList} />
          <Route path="/schedules" component={ScheduleList} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
