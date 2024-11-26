import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box, CssBaseline, Typography, Card, CardContent, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const drawerWidth = 240; // Adjust this value to match the sidebar width

function AdminDashboard() {
  const [counts, setCounts] = useState({
    courses: 0,
    programs: 0,
    professors: 0,
    students: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('/api/admin/counts'); // Adjust the endpoint as needed
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    const fetchRecentActivities = async () => {
      try {
        const response = await axios.get('/api/admin/recent-activities'); // Adjust the endpoint as needed
        setRecentActivities(response.data);
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      }
    };

    fetchCounts();
    fetchRecentActivities();
  }, []);

  return (
    <div>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              color: '#9e1b32',
              p: 3,
              marginLeft: `${drawerWidth}px`,
              width: `calc(100% - ${drawerWidth}px)`,
              mt: '64px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Replaced Grid layout with Box layout for Cards */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, color: '#9e1b32' }}>
              {['Courses', 'Programs', 'Professors', 'Students'].map((item, index) => (
                <Card key={index} sx={{ width: { xs: '100%', sm: '45%', md: '23%' }, minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h5">{item}</Typography>
                    <Typography variant="h6">{counts[item.toLowerCase()]}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box mt={4} width="100%">
              <Typography variant="h5" gutterBottom>
                Quick Access
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" color="primary" href="/programs">
                  Manage Programs
                </Button>
                <Button variant="contained" color="primary" href="/courses">
                  Manage Courses
                </Button>
                <Button variant="contained" color="primary" href="/professors">
                  Manage Professors
                </Button>
                <Button variant="contained" color="primary" href="/students">
                  Manage Students
                </Button>
              </Box>
            </Box>

            <Box mt={4} width="100%">
              <Typography variant="h5" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={activity.description} secondary={new Date(activity.created_at).toLocaleString()} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AdminDashboard;