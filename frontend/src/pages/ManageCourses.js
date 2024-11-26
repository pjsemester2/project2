import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', professor: '', program: '' });
  const [professors, setProfessors] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchProfessors();
    fetchPrograms();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/courses');
      setCourses(response.data.courses);
    } catch (err) {
      setError('Failed to fetch courses');
    }
    setLoading(false);
  };

  const fetchProfessors = async () => {
    try {
      const response = await axios.get('/professors');
      setProfessors(response.data.professors);
    } catch (err) {
      setError('Failed to fetch professors');
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('/programs');
      setPrograms(response.data.programs);
    } catch (err) {
      setError('Failed to fetch programs');
    }
  };

  const handleAddCourse = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/courses', newCourse);
      setNewCourse({ name: '', professor: '', program: '' }); // Reset the form
      fetchCourses();
    } catch (err) {
      setError('Failed to add course');
    }
    setLoading(false);
  };

  const handleDeleteCourse = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
    }
    setLoading(false);
  };

  const handleEditCourse = (id) => {
    // Implement edit functionality here
    console.log('Edit course with id:', id);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <h2>Manage Courses</h2>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Professor</TableCell>
                <TableCell>Program</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.professor}</TableCell>
                  <TableCell>{course.program}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleEditCourse(course.id)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteCourse(course.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box mt={2} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Professor</InputLabel>
          <Select
            value={newCourse.professor}
            onChange={(e) => setNewCourse({ ...newCourse, professor: e.target.value })}
          >
            {professors.map((professor) => (
              <MenuItem key={professor.id} value={professor.name}>
                {professor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Program</InputLabel>
          <Select
            value={newCourse.program}
            onChange={(e) => setNewCourse({ ...newCourse, program: e.target.value })}
          >
            {programs.map((program) => (
              <MenuItem key={program.id} value={program.ProgramName}>
                {program.ProgramName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddCourse}>
          Add Course
        </Button>
      </Box>
    </Box>
  );
}

export default ManageCourses;