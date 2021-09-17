import { useEffect, useState } from 'react';
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function EmployAverages(props) {


  const [serviciosDelUsuario, setServiciosDelUsuario] = useState([]);

  var promedio = 0;

  useEffect(() => {
    console.log("Consulta servicios realizados por empleado: ", props.empleado);
    setServiciosDelUsuario(ejemploServicios)

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
          {serviciosDelUsuario.map((row) => {
            promedio = promedio + row.calidad;
            return (
              <TableRow key={row.id}>
                <TableCell>{row.servicio}</TableCell>
                <TableCell>{props.empleado.id}</TableCell>
                <TableCell>{`${row.calidad}`}</TableCell>
                <TableCell>{row.observacion}</TableCell>
              </TableRow>
            )
          }
          )}
        </TableBody>
      </Table>
      <Box
        sx={{
          marginTop: 2,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {'Promedio de calidad = ' + (promedio / serviciosDelUsuario.length).toFixed(2)}
        </Typography>
      </Box>
    </React.Fragment>

  );
}




const ejemploServicios = [{
  id: 1,
  usuario: "Usuario 1",
  empleado: "Empleado 1",
  calidad: 100,
  servicio: "Servicio 1",
  observacion: "asdasd"
}, {
  id: 2,
  usuario: "Usuario 2",
  empleado: "Empleado 1",
  calidad: 0,
  servicio: "Servicio 1",
  observacion: ""
}
  , {
  id: 3,
  usuario: "Usuario 1",
  empleado: "Empleado 2",
  calidad: 0,
  servicio: "Servicio 1",
  observacion: "qweqwe"
}, {
  id: 4,
  usuario: "Usuario 2",
  empleado: "Empleado 1",
  calidad: 0,
  servicio: "Servicio 1",
  observacion: " ass ds"
}, {
  id: 5,
  usuario: "Usuario 1",
  empleado: "Empleado 1",
  calidad: 0,
  servicio: "Servicio 1",
  observacion: "12"
},
{
  id: 6,
  usuario: "Usuario 1",
  empleado: "Empleado 1",
  calidad: 0,
  servicio: "Servicio 2",
  observacion: "asd"
}
]