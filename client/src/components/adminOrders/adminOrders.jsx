import * as React from 'react';
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
import './adminOrders.css'
import emailjs from '@emailjs/browser';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminOrders } from '../../redux/actions/get_adminOrders';
import { updateOrderStatus } from '../../redux/actions/update_order_status'
import { getOrderDetail } from '../../redux/actions/get_order_detail'
import { cleanOrderDetailState } from '../../redux/actions/clean_order_detail_state'

// info del colapsable

function Row(props) {
  const { open, setOpen } = props
  const { order } = props;
  
  const dispatch = useDispatch()
  const orderDetail = useSelector(state => state.orderDetail)

  function emailSender(){
    let templateParams = {
      state: "fue despachado por el vendedor",
      name: order.userEmail,
      email: "bernardo.broscheit@gmail.com", // cambiar por el dato del mail del comprador
    };
  
    emailjs.send('service_d1v2e28', 'cambioEstado', templateParams, 'fbwvxNnmkAc-vqxnx')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      }
    );
  }
    
  function openCollapse(){
    dispatch(cleanOrderDetailState())
    if(open !== order.id){
      console.log(order.id)
    setOpen(false)
    setOpen(order.id)
    dispatch(getOrderDetail(order.id))
    } else {
      setOpen(false)  
    }
  }

  function changeSelect(e){
    const newSelectedStatus = document.getElementById(order.estado).options[document.getElementById(order.estado).selectedIndex].text

    if(order.stateOrden !== newSelectedStatus){
      console.log('Se cambió a ' + newSelectedStatus)
      dispatch(updateOrderStatus({id: order.id, estado: newSelectedStatus}))
      emailSender()
      console.log('Se cambió a ' + newSelectedStatus)
    }
  }

  return (
    <React.Fragment>
      <TableRow className='orderRow' sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            // onClick={() => setOpen(!open)}
            onClick={() => openCollapse()}
          >
            {open === order.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.estado}
        </TableCell>
        <TableCell align="left">{order.userEmail}</TableCell>
        <TableCell align="left">{order.total}</TableCell>
        <TableCell align="left">
            <select id={order.estado} defaultValue={order.stateOrden} onClick={e => changeSelect(e)}>
                <option disabled={true}>Pendiente</option> {/* A la espera del pago */}
                <option disabled={true}>Rechazada</option>
                <option disabled={true}>Aprobada</option> {/* Pago realizado, a la espera de despachar */}
                <option>En Camino</option> {/* Despachado */}
                <option disabled={true}>Completada</option> {/* Recibido y confirmado por el cliente */}
                <option disabled={true}>Cancelada</option> {/* Cancelada por el cliente */}
            </select>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open === order.id} timeout="auto" unmountOnExit>
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
                  {orderDetail.productos ? orderDetail.productos.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell component="th" scope="row">
                        {detail.name}
                      </TableCell>
                      <TableCell>{detail.price}</TableCell>
                      <TableCell align="left">{detail.quantity}</TableCell>
                      <TableCell align="left">
                        {Math.round(detail.quantity * detail.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  )) : <Typography sx={{marginTop: '10px'}}>Consultando a la base de datos...</Typography>}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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
    const dispatch = useDispatch()
    const orders = useSelector( state => state.orders)
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = React.useState(0)
    const [name, setName] = React.useState('')

    useEffect(() => {
      dispatch(getAdminOrders())
    })
    
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
              const pending = orders.filter(row => row.stateOrden === 'Pendiente')
            return pending
            case 2:
              const rejected = orders.filter(row => row.stateOrden === 'Rechazada')
            return rejected
            case 3:
                const approved = orders.filter(row => row.stateOrden === 'Aprobada')
            return approved
            case 4:
                const processing = orders.filter(row => row.stateOrden === 'En Camino')
            return processing
            case 5:
                const completed = orders.filter(row => row.stateOrden === 'Completada')
            return completed
            case 6:
                const cancelled = orders.filter(row => row.stateOrden === 'Cancelada')
            return cancelled
            case 7:
                document.getElementById('filterStatus').selectedIndex = 0
                const searched = orders.filter(row => row.userEmail.includes(name))
            return searched
            default: return orders
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
            <option value='En camino'>En Camino</option>
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
          {filterStatus().map((order) => (
            order.estado !== 'estado' && <Row open={open} setOpen={setOpen} key={order.id} order={order}/>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}