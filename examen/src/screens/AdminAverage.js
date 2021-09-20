
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Person from '@mui/icons-material/Person';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../utils/utils';
import Services from '../components/Services';
import EmployAverages from '../components/EmployAverages';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ServiceAverages from '../components/ServiceAverages';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/salome.lagos.21">
        Salome Lagos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


function UserServices() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const role = login(data.get('email'), data.get('password'))



  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AdminPanelSettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Pantalla de administrador
          </Typography>

        </Box>

      </Container>

      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 10,
          marginLeft: 10,
        }}
      >
        <Typography component="h1" variant="h5">
          Promedio por empleado
        </Typography>
        <EmployAverages />
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 10,
          marginLeft: 10,
        }}
      >
        <Typography component="h1" variant="h5">
          Promedio por Servicio
        </Typography>
        <ServiceAverages />

      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );

}

export default UserServices;



