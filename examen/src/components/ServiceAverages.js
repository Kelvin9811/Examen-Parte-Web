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

export default function ServiceAverages(props) {

  const [serviciosDelUsuarioPorServicioID, setserviciosDelUsuarioPorServicioID] = useState([]);
  const [calidadServiciosPorUsuario, setCalidadServiciosPorUsuario] = useState(0);
  var promedio = 0;

  const getServices = async () => {
    await callApiAxios('sql/GetServicesById', 'GET', { id_formulario: props.servicio.id_serviciosimple }, 'Params').then((ress) => {
      setserviciosDelUsuarioPorServicioID(ress.data)

      callApiAxios('sql/GetAverageServicesById', 'GET', { id_formulario: props.servicio.id_serviciosimple }, 'Params').then((ress) => {
        const calidad = ress.data[0]['AVG(calidad_servicio)'];
        setCalidadServiciosPorUsuario(parseFloat(calidad))
      })

      

    })
  }
  useEffect(() => {
    //setserviciosDelUsuarioPorServicioID(ejemploServicios)
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
          {serviciosDelUsuarioPorServicioID.map((row) => {
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




