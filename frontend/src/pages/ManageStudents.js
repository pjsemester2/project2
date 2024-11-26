import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', surname: '', program_id: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('/student/students');
    setStudents(response.data.students);
  };

  const handleAddStudent = async () => {
    await axios.post('/student/students', newStudent);
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    await axios.delete(`/student/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <h2>Manage Students</h2>
      <List>
        {students.map(student => (
          <ListItem key={student.id}>
            <ListItemText primary={`${student.name} ${student.surname}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteStudent(student.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div>
        <TextField label="First Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
        <TextField label="Surname" value={newStudent.surname} onChange={(e) => setNewStudent({ ...newStudent, surname: e.target.value })} />
        <TextField label="Program ID" value={newStudent.program_id} onChange={(e) => setNewStudent({ ...newStudent, program_id: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleAddStudent}>Add Student</Button>
      </div>
    </div>
  );
}

export default ManageStudents;