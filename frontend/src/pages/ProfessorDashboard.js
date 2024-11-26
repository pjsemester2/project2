import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfessorSidebar from '../components/ProfessorSidebar';
import { Box, CssBaseline, Typography, Container, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import axios from 'axios';

const drawerWidth = 300; // Adjust this value to match the sidebar width

function ProfessorDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [professorName, setProfessorName] = useState('');

  useEffect(() => {
    const fetchProfessorName = async () => {
      try {
        const response = await axios.get('/professor/profile'); // Adjust the endpoint as needed
        setProfessorName(response.data.username);
      } catch (error) {
        console.error('Error fetching professor name:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/professor/courses'); // Adjust the endpoint as needed
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchProfessorName();
    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleStartAttendance = () => {
    // Handle start attendance logic here
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout');
  };

  const handleAutoAttendance = () => {
    // Handle auto attendance logic here
  };

  const handleManualAttendance = () => {
    // Handle manual attendance logic here
  };

  return (
    <div>
      <CssBaseline />
      <Navbar userName={professorName} role="Professor" onLogout={handleLogout} />
      <Box sx={{ display: 'flex' }}>
        <ProfessorSidebar onAutoAttendance={handleAutoAttendance} onManualAttendance={handleManualAttendance} />
        <Box sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px`, mt: '64px' }}>
          <Container>
            <Typography variant="h4" gutterBottom>
              Welcome, Professor!
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="course-select-label">Select Course</InputLabel>
              <Select
                labelId="course-select-label"
                id="course-select"
                value={selectedCourse}
                label="Select Course"
                onChange={handleCourseChange}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleStartAttendance}
            >
              Start Attendance
            </Button>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default ProfessorDashboard;