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
import './adminOrders.css'

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminOrders } from '../../redux/actions/get_adminOrders';
import { updateOrderStatus } from '../../redux/actions/update_order_status'
import { getOrderDetail } from '../../redux/actions/get_order_detail'

function createData(orderNum, client, status, total) {
  return {
    orderNum,
    client,
    status,
    total,
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
    createData('12345', 'cliente2@hotmail.com', 'Aprobada', 1500),
    createData('12346', 'admin@hotmail.com', 'En camino', 3500),
    createData('1234', 'cliente1@hotmail.com', 'Completada', 4100),
    createData('1', 'cliente4@hotmail.com', 'Cancelada', 4537),
    createData('147', 'cliente3@hotmail.com', 'Aprobada', 3675),
    createData('20548', 'cuchuflito@hotmail.com', 'Pendiente', 4572),
    createData('20445', 'cumpleañito@hotmail.com', 'Rechazada', 500),
  ];
  

// info del colapsable


function Row(props) {
  const { row } = props;
  //const { orders } = props
  const [open, setOpen] = React.useState(false);

  // function openCollapse(){
  //   setOpen(!open)
  //   dispatch(getOrderDetail(orders.numOrder))
  // }

  // const orderDetail = useSelector(state => state.orderDetail)

  function changeSelect(e){
    const newSelectedStatus = document.getElementById(row.orderNum).options[document.getElementById(row.orderNum).selectedIndex].text
    
    if(row.status !== newSelectedStatus){
      //dispatch(updateOrderStatus(orders.numOrder, newSelectedStatus))
        row.status = newSelectedStatus
        console.log(newSelectedStatus)
        console.log(row.client + ' se cambio a ' + newSelectedStatus)
    }
  }

  return (
    <React.Fragment>
      <TableRow className='orderRow' sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            /*onClick={() => openCollapse()}*/
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderNum}
        </TableCell>
        <TableCell align="left">{row.client}</TableCell>
        <TableCell align="left">{row.total}</TableCell>
        <TableCell align="left">
            <select id={row.orderNum} defaultValue={row.status} onClick={e => changeSelect(e)}>
                <option disabled={true}>Pendiente</option> {/* A la espera del pago */}
                <option disabled={true}>Rechazada</option>
                <option disabled={true}>Aprobada</option> {/* Pago realizado, a la espera de despachar */}
                <option>En camino</option> {/* Despachado */}
                <option disabled={true}>Completada</option> {/* Recibido y confirmado por el cliente */}
                <option disabled={true}>Cancelada</option> {/* Cancelada por el cliente */}
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



const Search = styled('div')(({ theme }) => ({
    position: 'relative', 
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function AdminOrders() {
    // const dispatch = useDispatch()
    // const orders = useSelector( state => state.orders)
    
    // useEffect(() => {
    //   dispatch(getAdminOrders())
    // })

    const [filter, setFilter] = React.useState(0)
    const [name, setName] = React.useState('')
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        setFilter(7)
    };
    
    function handleSubmit(){
        setName('')
    }

    function filterStatus(){
        switch(filter){
            case 1:
              const pending = rows.filter(row => row.status === 'Pendiente')
            return pending
            case 2:
              const rejected = rows.filter(row => row.status === 'Rechazada')
            return rejected
            case 3:
                const approved = rows.filter(row => row.status === 'Aprobada')
            return approved
            case 4:
                const processing = rows.filter(row => row.status === 'En camino')
            return processing
            case 5:
                const completed = rows.filter(row => row.status === 'Completada')
            return completed
            case 6:
                const cancelled = rows.filter(row => row.status === 'Cancelada')
            return cancelled
            case 7:
                document.getElementById('filterStatus').selectedIndex = 0
                const searched = rows.filter(row => row.client.includes(name))
            return searched
            default: return rows /*orders*/
        }
    }


  return (
    <TableContainer sx={{width: '800px', marginTop: '40px', marginBottom: '40px'}} component={Paper}>
      <Typography sx={{marginLeft: '20px', marginTop: '10px'}} align="left" gutterBottom variant="h5" component="div">
        Herramienta de gestión de ventas
      </Typography>
      <Search className='input' sx={{ position: 'relative', left: '-10px', maxWidth: '30%', border: '1.5px solid rgb(225, 225, 225)' }}>
            <SearchIconWrapper>
              <SearchIcon sx={{color: 'rgb(225, 225, 225)'}}/>
            </SearchIconWrapper>
            <StyledInputBase
              value= {name}
              sx={{ display: 'flex'}}
              placeholder="Busca por e-mail…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) =>{if(e.key === 'Enter'){handleSubmit()}}}
            />
          </Search>
      <Box sx={{marginLeft: '20px', marginTop: '10px'}} align="left">
        <Box>
        <>Filtrar por: </>
        <select id='filterStatus' defaultValue='Todas' onClick={e => setFilter(document.getElementById('filterStatus').selectedIndex)}>       
            <option value='Todas'>Todas</option>
            <option value='Pendiente'>Pendiente</option>
            <option value='Rechazada'>Rechazada</option>
            <option value='Aprobada'>Aprobada</option>
            <option value='En camino'>En camino</option>
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
            <TableCell align="left">Total ($)</TableCell>
            <TableCell align="left">Estado</TableCell>
          </TableRow>
        </TableHead>
    
        <TableBody>
          {filterStatus().map((row) => (
            <Row  key={row.orderNum} row={row}/>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}