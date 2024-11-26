import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ProfessorDashboard from './pages/ProfessorDashboard';
import ManageCourses from './pages/ManagePrograms';
import ManagePrograms from './pages/ManageCourses';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/professor" element={<ProfessorDashboard />} />
      <Route path='/courses' element={<ManageCourses />} />
      <Route path='/programs' element={<ManagePrograms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;