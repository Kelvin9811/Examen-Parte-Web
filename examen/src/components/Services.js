import { useEffect,useState } from 'react';
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


export default function Services() {

  const [userServices, setUserServices] = useState([]);
  useEffect(() => {
    setUserServices(ejemploConsulta)
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
            <TableRow key={userService.id}>
              <TableCell >{userService.servicio}</TableCell>
              <TableCell>{userService.empleado}</TableCell>
              <TableCell padding={"normal"}>
                <Box sx={{ width: 120 }}>
                  <TextField
                    size={"small"}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Calidad"
                    type="number"
                    value={userService.calidad}
                    pattern={'[0-9]*'}
                    id={"txtQuality" + userService.id}
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
                  id={"txtObservation" + userService.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}


const ejemploConsulta = [{
  id: 1,
  usuario: "Usuario 1",
  empleado: "Empleado 1",
  calidad: 0,
  servicio: "Servicio 1",
  observacion: ""
},
  , {
  id: 3,
  usuario: "Usuario 1",
  empleado: "Empleado 2",
  calidad: 0,
  servicio: "Servicio 1",
  observacion: ""
}, {
  id: 5,
  usuario: "Usuario 1",
  empleado: "Empleado 1",
  calidad: 0,
  servicio: "Servicio 1",
  observacion: ""
},
{
  id: 6,
  usuario: "Usuario 1",
  empleado: "Empleado 1",
  calidad: 0,
  servicio: "Servicio 2",
  observacion: ""
}
]





// ------------------------------------------------Generate Order Data----------------------------------------------------------------------------------------------------------------
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}
