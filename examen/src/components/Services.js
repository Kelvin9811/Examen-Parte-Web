import { useEffect, useState } from 'react';
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { callApiAxios } from '../utils/utils';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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





export default function Services(props) {

  const [userServices, setUserServices] = useState([]);

  const [textInputsData, setTextInputsData] = useState({});

  const getServices = async () => {
    callApiAxios('sql/GetServices', 'GET', { userid: props.user.id_usuario }, 'Params').then((ress) => {
      setUserServices(ress.data)
      let auxqualityText = {}
      ress.data.forEach(element => {
        console.log(element);
        auxqualityText["id" + element.id_formulario] = {
          id: "" + element.id_formulario,
          quality: "" + element.calidad_servicio,
          observation: "" + element.observacion,
        }
      });
      setTextInputsData(auxqualityText);
    })
  }

  const updateSubmnit = async (event) => {
    event.preventDefault();
    console.log(textInputsData);
    for (const data in textInputsData) {
      const auxData = {
        id_formulario: textInputsData[data].id,
        calidad_servicio: textInputsData[data].quality,
        observacion: textInputsData[data].observation
      }

      console.log(auxData);
      callApiAxios('sql/updateQulityObservation', 'POST', auxData, 'Params').then((ress) => {
        console.log(ress);
      })
    }
  };
  const onChangeQualityEvent = (event, userService) => {
    if (event.target.value > -1 && event.target.value < 6) {
      let auxqualityText = {
        ...textInputsData,
      }
      auxqualityText["id" + userService.id_formulario] = {
        ...auxqualityText["id" + userService.id_formulario],
        quality: event.target.value
      }
      setTextInputsData(auxqualityText)
    }
  }

  const onChangeObservationEvent = (event, userService) => {
    let auxqualityText = {
      ...textInputsData,
    }
    auxqualityText["id" + userService.id_formulario] = {
      ...auxqualityText["id" + userService.id_formulario],
      observation: event.target.value
    }
    setTextInputsData(auxqualityText)
  }

  useEffect(() => {
    getServices();
  }, [])
  const theme = createTheme();


  return (
    <React.Fragment>

      <Container component="main" >
        <Box
          sx={{


            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={updateSubmnit} noValidate sx={{ mt: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Servicio</TableCell>
                  <TableCell>Empleado</TableCell>
                  <TableCell>Calidad de servicio</TableCell>
                  <TableCell>Observación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userServices.map((userService) => (
                  <TableRow key={userService.id_formulario}>
                    <TableCell >{userService.id_serviciosimple}</TableCell>
                    <TableCell>{userService.id_empleado}</TableCell>
                    <TableCell padding={"normal"}>
                      <Box sx={{ width: 120 }}>
                        <TextField
                          size={"small"}
                          margin="normal"
                          fullWidth
                          name={"txtQuality" + userService.id_formulario}
                          label={"Calidad: " + userService.calidad_servicio}
                          type="number"
                          id={"txtQuality" + userService.id_formulario}
                          value={textInputsData["id" + userService.id_formulario] ? textInputsData["id" + userService.id_formulario].quality : userService.calidad_servicio}
                          onChange={(event) => {
                            onChangeQualityEvent(event, userService)
                          }}
                        />
                      </Box>

                    </TableCell>
                    <TableCell>
                      <TextField
                        margin="normal"
                        fullWidth
                        size={"small"}
                        name={"txtObservation" + userService.id_formulario}
                        label="Obrservacion"
                        id={"txtObservation" + userService.id_formulario}
                        value={textInputsData["id" + userService.id_formulario] ? textInputsData["id" + userService.id_formulario].observation : userService.observacion}
                        onChange={(event) => {
                          onChangeObservationEvent(event, userService)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>

          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>



    </React.Fragment>
  );
}
