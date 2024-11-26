import React from 'react';
import { Box, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function ProfessorSidebar({ onAutoAttendance, onManualAttendance }) {
  return (
    <Box sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <SchoolIcon sx={{ fontSize: 40 }} />
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={onAutoAttendance}
      >
        Auto Attendance
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={onManualAttendance}
      >
        Manual Attendance
      </Button>
    </Box>
  );
}

export default ProfessorSidebar;