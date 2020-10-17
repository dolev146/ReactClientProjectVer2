import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Flights from './components/Flights';
import Login from './components/Login';
import Signup from './components/Signup';
import AddFlight from './components/AddFlight';
import EditFlight from './components/EditFlight';
import Reports from './components/Reports';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/add" component={AddFlight} />
        <Route path="/edit/:id" component={EditFlight} />
        <Route path="/reports" component={Reports} />
        <Route path="/" exact component={Flights} />
      </div>
    </Router>
  );
}

export default App;
