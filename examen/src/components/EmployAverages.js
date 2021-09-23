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
import { callApiAxios } from '../utils/utils';

export default function EmployAverages(props) {


  const [serviciosDelUsuario, setServiciosDelUsuario] = useState([]);
  const [calidadServiciosPorUsuario, setCalidadServiciosPorUsuario] = useState(0);

  var promedio = 0;

  const getServices = async () => {
    callApiAxios('sql/GetServicesByEmploy', 'GET', { id_empleado: props.empleado.id_empleado }, 'Params').then((ress) => {
      setServiciosDelUsuario(ress.data)
    })
    callApiAxios('sql/GetAverageServicesByEmploy', 'GET', { id_empleado: props.empleado.id_empleado }, 'Params').then((ress) => {
      const calidad = ress.data[0]['AVG(calidad_servicio)'];
      setCalidadServiciosPorUsuario(parseFloat(calidad))
    })

  }
  useEffect(() => {
    getServices()
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
            promedio = promedio + row.calidad_servicio;
            return (
              <TableRow key={row.id_formulario}>
                <TableCell>{row.id_serviciosimple}</TableCell>
                <TableCell>{row.id_empleado}</TableCell>
                <TableCell>{`${row.calidad_servicio}`}</TableCell>
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
          {'Promedio de calidad = ' + calidadServiciosPorUsuario.toFixed(2)}
        </Typography>
      </Box>
    </React.Fragment>

  );
}



