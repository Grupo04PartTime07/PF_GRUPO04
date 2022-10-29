import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from "@mui/material";

function createData(orderNum, client, status) {
  return {
    orderNum,
    client,
    status,
    history: [
      {
        producto: 'Vino',
        precio: '500',
        cantidad: 3,
      },
      {
        producto: 'Mayonesa',
        precio: '200',
        cantidad: 1,
      },
    ],
  };
}

const rows = [
    createData('12345', 'cliente2@hotmail.com', 'Aprobada'),
    createData('12346', 'admin@hotmail.com', 'En proceso'),
    createData('1234', 'cliente1@hotmail.com', 'Completada'),
    createData('1', 'cliente4@hotmail.com', 'Cancelada'),
    createData('147', 'cliente3@hotmail.com', 'Aprobada'),
  ];
  

// info del colapsable


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

    function changeSelect(e){
        const newSelectedStatus = document.getElementById(row.orderNum).options[document.getElementById(row.orderNum).selectedIndex].text
        if(row.status !== newSelectedStatus){
            row.status = newSelectedStatus
            console.log(newSelectedStatus)
            console.log(row.client + ' se cambio a ' + newSelectedStatus)
        }
    }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderNum}
        </TableCell>
        <TableCell align="left">{row.client}</TableCell>
        <TableCell align="left">
            <select id={row.orderNum} defaultValue={row.status} onClick={e => changeSelect(e)}>
                <option>Aprobada</option>
                <option>En proceso</option>
                <option>Completada</option>
                <option>Cancelada</option>
            </select>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle de la compra
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                    <TableCell align="left">Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.producto}>
                      <TableCell component="th" scope="row">
                        {historyRow.producto}
                      </TableCell>
                      <TableCell>{historyRow.precio}</TableCell>
                      <TableCell align="left">{historyRow.cantidad}</TableCell>
                      <TableCell align="left">
                        {Math.round(historyRow.cantidad * historyRow.precio * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    orderNum: PropTypes.number.isRequired,
    client: PropTypes.string.isRequired,
    status: PropTypes.any.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        cantidad: PropTypes.number.isRequired,
        precio: PropTypes.string.isRequired,
        producto: PropTypes.string.isRequired,
      }),
    ).isRequired,
    orderNum: PropTypes.string.isRequired,
  }).isRequired,
};


// Nombres de las columnas



export default function AdminOrders() {

    const [filter, setFilter] = React.useState(0)

    function filterStatus(){
        switch(filter){
            case 1:
                const approved = rows.filter(row => row.status === 'Aprobada')
            return approved
            case 2:
                const processing = rows.filter(row => row.status === 'En proceso')
            return processing
            case 3:
                const completed = rows.filter(row => row.status === 'Completada')
            return completed
            case 4:
                const cancelled = rows.filter(row => row.status === 'Cancelada')
            return cancelled
            default: return rows
        }
    }

  return (
    <TableContainer sx={{width: '800px', marginTop: '40px'}} component={Paper}>
      <Typography sx={{marginLeft: '20px', marginTop: '10px'}} align="left" gutterBottom variant="h5" component="div">
        Herramienta de gestión de ventas
      </Typography>
      <Box sx={{marginLeft: '20px', marginTop: '10px'}} align="left">
        <Box>
        <>Filtrar por: </>       
        <select id='filterStatus' defaultValue='Todas' onClick={e => setFilter(document.getElementById('filterStatus').selectedIndex)}>       
            <option value='Todas'>Todas</option>
            <option value='Aprobada'>Aprobada</option>
            <option value='En proceso'>En proceso</option>
            <option value='Completada'>Completada</option>
            <option value='Cancelada'>Cancelada</option>
        </select> 
        </Box>
      </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nro de orden</TableCell>
            <TableCell align="left">Cliente</TableCell>
            <TableCell align="left">Estado</TableCell>
          </TableRow>
        </TableHead>
    
        <TableBody>
          {filterStatus().map((row) => (
            <Row key={row.orderNum} row={row} />
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}