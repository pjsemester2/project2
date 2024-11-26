import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ course: '', professor_id: '', program_id: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await axios.get('/courses');
    setCourses(response.data.courses);
  };

  const handleAddCourse = async () => {
    await axios.post('/courses', newCourse);
    fetchCourses();
  };

  const handleDeleteCourse = async (id) => {
    await axios.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div>
      <h2>Manage Courses</h2>
      <List>
        {courses.map(course => (
          <ListItem key={course.id} 
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCourse(course.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={course.course} />
          </ListItem>
        ))}
      </List>
      <div>
        <TextField label="Course Name" value={newCourse.course} onChange={(e) => setNewCourse({ ...newCourse, course: e.target.value })} />
        <TextField label="Professor ID" value={newCourse.professor_id} onChange={(e) => setNewCourse({ ...newCourse, professor_id: e.target.value })} />
        <TextField label="Program ID" value={newCourse.program_id} onChange={(e) => setNewCourse({ ...newCourse, program_id: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleAddCourse}>Add Course</Button>
      </div>
    </div>
  );
}

export default ManageCourses;