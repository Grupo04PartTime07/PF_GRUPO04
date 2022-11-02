import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getOrders } from '../../redux/actions/get_orders';
//import PropTypes from 'prop-types';
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
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
//import Button from '@material-ui/core/Button';
//import styles from "./orderList.module.css";
import Tooltip from '@mui/material/Tooltip';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { getOrderDetail } from '../../redux/actions/get_order_detail';
import { cleanOrderDetailState } from '../../redux/actions/clean_order_detail_state';
import { addOrderToCart } from '../../redux/actions/add_order_to_cart';
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
import { updateOrderStatus } from '../../redux/actions/update_order_status';
import { sortedOrders } from '../../redux/actions/sorted_orders';
import ModalReclamo from "../modalReclamo/modalReclamo.jsx"

function Row(props) {

  const dispatch = useDispatch()
  const orderDetail = useSelector(state => state.orderDetail)
  const [open, setOpen] = useState(false);
  

  function handleOnClick(id){
   if(open === false){
      dispatch(getOrderDetail(id))  
      setOpen(true)
       
   }else {
     setOpen(false)
     dispatch(cleanOrderDetailState())
   }
  }

  

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleOnClick(props.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" size="fit-content">
          {props.date}
        </TableCell>
        <TableCell align="right" size="fit-content">${props.total}</TableCell>
        <TableCell align="right" size="fit-content">{props.id}</TableCell>
        <TableCell align="right" size="fit-content">{props.status}</TableCell>
       
        <TableCell> 
        <Tooltip title="Generar un reclamo" placement="top-start">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" id={props.id}
            onClick={(e)=>props.openModal(e)}>
            <AssignmentOutlinedIcon id={props.id}/>
        </IconButton>
        </Tooltip> 
        </TableCell> 
       
        <TableCell> 
        {props.status !== "Completada" && props.status !== "Cancelada" && props.status !== "Rechazada" && props.status !== "Pendiente" ? 
        <Tooltip title="Confirmar entrega" placement="top-start">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" name="Completada"
            onClick={(e)=> dispatch(updateOrderStatus(props.id,e.target.name)) }>
            <CheckBoxOutlinedIcon/>
        </IconButton>
        </Tooltip> :
         <Tooltip title="Entrega confirmada" placement="top-start">
         <IconButton size="large" aria-label="show 4 new mails" color="inherit"
         disabled>
            <CheckBoxTwoToneIcon/>
        </IconButton>
        </Tooltip>
         }
        </TableCell>
        <TableCell> 
        {props.status === "Pendiente" || props.status === "Aprobado" ? 
        <Tooltip title="Cancelar compra" placement="top-start">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" name="Cancelada"
            onClick={(e)=> dispatch(updateOrderStatus(props.id,e.target.name))}>
            <DisabledByDefaultOutlinedIcon/>
        </IconButton>
        </Tooltip> :
         <Tooltip title="" placement="top-start">
         <IconButton size="large" aria-label="show 4 new mails" color="inherit"
         disabled>
            <DisabledByDefaultTwoToneIcon/>
        </IconButton>
        </Tooltip>
         }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle de la Compra
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio($)</TableCell>
                    <TableCell>
                    <Tooltip title="Repetir la compra" placement="top-start">
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                    onClick={()=> props.addOrderToCart(props.id) }>
                    <AddShoppingCartTwoToneIcon />
                    </IconButton>
                    </Tooltip>  
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                      <Avatar alt="Image" src={product.image} />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        {product.price}
                      </TableCell>
                      <TableCell>
                      <Tooltip title="Ver detalle del producto" placement="top-start">
                      <Link className='cardLink' to={`/products/${product.id}`} style={{textDecoration:"none", color: "black"}} >
                      <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                       >
                      <ContentPasteSearchOutlinedIcon  />
                      </IconButton>
                      </Link>
                      </Tooltip> 
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

/*Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};*/



export default function OrderList(props) {

const { user} = useAuth0();
const dispatch = useDispatch()
const [modal, setModal] = useState(false)
const [idOrder, setIdorder] = useState("")

useEffect(() => {  // Didmount and DidUpdate controlled
  //window.scrollTo(0, 0)
  dispatch(getOrders(user.email));
},[dispatch])

const orders = useSelector(state => state.sortedOrders)
const openModal = (e) => {
  setModal(true)
  console.log("Id:",e.target.id)
  setIdorder(e.target.id)
}
const closeModal = () => {
  setModal(false)
  setIdorder("")
}


return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <TableCell />
            <TableCell>Fecha </TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Orden#&nbsp;</TableCell>
            <TableCell align="right">Status&nbsp;</TableCell>
            <TableCell>
            <label  htmlFor="mayor-menor-a-z">Ordenar/Filtrar: </label>
            <select name="mayor-menor-a-z"id="mayor-menor-a-z" 
            onChange={(e) => dispatch(sortedOrders(e.target.value))}
            >
                <option value="Todas las compras">Todas las compras</option>
                <option value="Compras recientes">Compras recientes</option>
                <option value="Primeras compras">Primeras compras</option>
                <option value="Mayor precio">Mayor precio</option>
                <option value="Menor precio">Menor precio</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Rechazado">Rechazado</option>
                <option value="Aprobado">Aprobado</option>
                <option value="En camino">En camino</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
            </select>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <Row 
            key={order.id} 
            date={order.date}
            total={order.total}
            id={order.id}
            status={order.status}
            addOrderToCart={()=> dispatch(addOrderToCart(order.id))}
            openModal={openModal}
            
            />
          ))}
           <ModalReclamo
            modal={modal}
            openModal={openModal}
            closeModal={closeModal}
            id={idOrder}
            userEmail={user.email}
            >
            </ModalReclamo>
        </TableBody>
      </Table>
    </TableContainer>
  );
} 
