import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';

import ListTask from './pages/ListTask';
import EditTask from './pages/EditTask';
import ListUsers from './pages/ListUsers';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/list-task" element={<ListTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/users" element={<ListUsers />} />

      </Routes>
    </BrowserRouter>
  );
}




export default App;
