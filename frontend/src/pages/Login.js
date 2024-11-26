import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logo from '/Users/waslink/Desktop/project2/frontend/src/images/UPEC LOGO.jpg'; // Update the path to your logo
import backgroundImage from '/Users/waslink/Desktop/project2/frontend/src/images/app.jpg';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5', // Shared background color
}));

const Main = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1 0 auto',
  flexDirection: { xs: 'column', md: 'row' },
  width: '90%', // Reduced width to show more background
  maxWidth: '1000px', // Reduced max width
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  borderRadius: '8px', // Rounded corners for a cohesive look
  overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
}));

const Left = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff', // White background for the left section
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3), // Reduced padding
  flex: 1,
  borderRight: '1px solid #e0e0e0', // Light border to connect sections
}));

const Right = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(10), // Reduced padding
  flex: 1,
  minHeight: '300px', // Ensure a minimum height for the image container
}));

const Logo = styled('img')(({ theme }) => ({
  width: '120px', // Reduced logo size
  marginBottom: theme.spacing(2),
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: 'left',
  width: '100%',
  position: 'relative',
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
}));

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/login', { username, password }); // Use relative URL
      if (response.data.success) {
        navigate('/admin');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Root>
      <Main>
        <Left>
          <Logo src={logo} alt="UPEC Logo" />
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography color='#9e1b32' component="h1" variant="h5" fontFamily={'monospace'}>
                UPEC Attendance System
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  color='#9e1b32'
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  color='#9e1b32'
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend" color='#9e1b32'>Role</FormLabel>
                  <RadioGroup
                    row
                    aria-label="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <FormControlLabel color='#9e1b32' value="admin" control={<Radio />} label="Admin" />
                    <FormControlLabel color='#9e1b32' value="professor" control={<Radio />} label="Professor" />
                    <FormControlLabel color='#9e1b32' value="student" control={<Radio />} label="Student" />
                  </RadioGroup>
                </FormControl>
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#9e1b32', color: '#fff' }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#9e1b32', color: '#fff' }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign Up'}
                </Button>
              </Box>
            </Box>
          </Container>
        </Left>

        <Right color={'#9e1b32'}>
        </Right>
      </Main>
      <Footer>
        <Typography variant="body2" color="textSecondary">
          © 2024 UPEC. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Contact us: info@upec.edu
        </Typography>
      </Footer>
    </Root>
  );
}

export default Login;