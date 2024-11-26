import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = { xs: 200, sm: 240, md: 280, lg: 320, xl: 360 };

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <Avatar sx={{ width: { xs: 40, sm: 50, md: 60, lg: 70, xl: 80 }, height: { xs: 40, sm: 50, md: 60, lg: 70, xl: 80 } }}>
          <AssignmentIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' } }} />
        </Avatar>
      </Box>
      <List>
        <ListItem button component={Link} to="/admin" sx={{ padding: { xs: '10px', sm: '12px', md: '14px', lg: '16px', xl: '18px' } }}>
          <ListItemIcon>
            <DashboardIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' } }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' } }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/courses" sx={{ padding: { xs: '10px', sm: '12px', md: '14px', lg: '16px', xl: '18px' } }}>
          <ListItemIcon>
            <BookIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' } }} />
          </ListItemIcon>
          <ListItemText primary="Courses" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' } }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/programs" sx={{ padding: { xs: '10px', sm: '12px', md: '14px', lg: '16px', xl: '18px' } }}>
          <ListItemIcon>
            <SchoolIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' } }} />
          </ListItemIcon>
          <ListItemText primary="Programs" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' } }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/professors" sx={{ padding: { xs: '10px', sm: '12px', md: '14px', lg: '16px', xl: '18px' } }}>
          <ListItemIcon>
            <PersonIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' } }} />
          </ListItemIcon>
          <ListItemText primary="Professors" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' } }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/students" sx={{ padding: { xs: '10px', sm: '12px', md: '14px', lg: '16px', xl: '18px' } }}>
          <ListItemIcon>
            <PeopleIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' } }} />
          </ListItemIcon>
          <ListItemText primary="Students" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' } }} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;