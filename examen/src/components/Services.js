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
import { callApiAxios } from '../utils/utils';



export default function Services(props) {

  const [userServices, setUserServices] = useState([]);

  const getServices = async () => {
    callApiAxios('sql/GetServices', 'GET', { userid: props.user.id_usuario }, 'Params').then((ress) => {
      setUserServices(ress.data)
    })
  }
  useEffect(() => {
    getServices();
  }, [])


  return (
    <React.Fragment>
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
                    name="password"
                    label="Calidad"
                    type="number"
                    value={userService.calidad_servicio}
                    pattern={'[0-9]*'}
                    id={"txtQuality" + userService.id_formulario}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <TextField
                  margin="normal"
                  fullWidth
                  size={"small"}
                  value={userService.observacion}
                  name="password"
                  label="Observación"
                  id={"txtObservation" + userService.id_formulario}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
