import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageProfessors() {
  const [professors, setProfessors] = useState([]);
  const [newProfessor, setNewProfessor] = useState({ name: '', password: '' });

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    const response = await axios.get('/professor/professors');
    setProfessors(response.data.professors);
  };

  const handleAddProfessor = async () => {
    await axios.post('/professor/professors', newProfessor);
    fetchProfessors();
  };

  const handleDeleteProfessor = async (id) => {
    await axios.delete(`/professor/professors/${id}`);
    fetchProfessors();
  };

  return (
    <div>
      <h2>Manage Professors</h2>
      <List>
        {professors.map(professor => (
          <ListItem key={professor.id}>
            <ListItemText primary={professor.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProfessor(professor.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div>
        <TextField label="Professor Name" value={newProfessor.name} onChange={(e) => setNewProfessor({ ...newProfessor, name: e.target.value })} />
        <TextField label="Password" type="password" value={newProfessor.password} onChange={(e) => setNewProfessor({ ...newProfessor, password: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleAddProfessor}>Add Professor</Button>
      </div>
    </div>
  );
}

export default ManageProfessors;