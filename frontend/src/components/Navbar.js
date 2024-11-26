import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';

const drawerWidth = 300; // Adjust this value to match the sidebar width

function Navbar({ userName, role }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout');
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, paddingBottom: '2px', ml: `${drawerWidth}px` }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif' }}>
          <Typography variant="h6">
            {role} Dashboard
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={handleMenuOpen} sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' } }}>
          <AccountCircle fontSize="inherit" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>{userName}</MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ marginRight: '8px' }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;