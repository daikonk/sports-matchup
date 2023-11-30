// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CreateEdit from './CreateEdit';
import MyEvents from './MyEvents';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" exact component={Home} />
        <Route path="/create-edit-events" component={CreateEdit} />
        <Route path="/my-events" component={MyEvents} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

