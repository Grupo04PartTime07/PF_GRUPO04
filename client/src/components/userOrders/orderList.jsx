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
import styles from "./orderList.module.css";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

function Row(props) {

  const dispatch = useDispatch()
  const orderDetail = useSelector(state => state.orderDetail)
  const {open, setOpen} = props

  function handleOnClick(){
    dispatch(cleanOrderDetailState())
    if(open !== props.id){
      setOpen(false)
      setOpen(props.id)
      dispatch(getOrderDetail(props.id))         
   }else {
     setOpen(false)
     dispatch(cleanOrderDetailState())
   }
  }

  

  return (
    <React.Fragment>
      <TableRow className={styles.orderRow} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            id={props.id}
            onClick={() => handleOnClick()}
          >
            {open === props.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" size="fit-content">
          {props.date}
        </TableCell>
        <TableCell align="right" size="fit-content">${props.total}</TableCell>
        <TableCell align="right" size="fit-content">{props.orden}</TableCell>
        <TableCell align="right" size="fit-content">{props.status}</TableCell>
       
        <TableCell>
          <div onClick={(e)=>props.openModal(e)} id={props.id}>
        <Tooltip title="Generar un reclamo" placement="top-start">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" id={props.id}
            onClick={(e)=>props.openModal(e)}>
            <AssignmentOutlinedIcon onClick={(e)=>props.openModal(e)} id={props.id}/>
        </IconButton>
        </Tooltip>
        </div>  
        </TableCell> 
       
        <TableCell> 
        {props.status !== "Completada" && props.status !== "Cancelada" && props.status !== "Rechazada" && props.status !== "Pendiente" ? 
        <Tooltip title="Confirmar entrega" placement="top-start">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" name="Completada"
          onClick={()=> dispatch(updateOrderStatus({id:props.id,estado:"Completada"})) }   >
            <CheckBoxOutlinedIcon />
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
        {props.status === "Aprobada" ? 
        <Tooltip title="Cancelar compra" placement="top-start">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" name="Cancelada"
          onClick={()=> dispatch(updateOrderStatus({id:props.id,estado:"Cancelada"}))}   >
            <DisabledByDefaultOutlinedIcon />
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
          <Collapse in={open === props.id} timeout="auto" unmountOnExit>
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
                  {orderDetail && orderDetail.productos ? orderDetail.productos.map((product) => (
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
                  )):null}
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
const [idOrder, setIdOrder] = useState("")
const [page, setPage] = useState(0)
const [rowsPerPage, setRowsPerPage] = useState(5)
const [open, setOpen] = useState(false);

useEffect(() => {  // Didmount and DidUpdate controlled
  //window.scrollTo(0, 0)
  dispatch(getOrders(user.email));
},[dispatch])

const orders = useSelector(state => state.sortedOrders)

const openModal = (e) => {
  if(e.target.id){
  setModal(true)
  console.log("Id:",e.target.id)
  setIdOrder(e.target.id)
  }else{
  setModal(false)  
}}
const closeModal = () => {
  setModal(false)
  //setIdorder("")
}
const handleChangesRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value),10)
  setPage(0)
}
const handleChangePage = (event, newPage) => {
  setPage(newPage)
}


return (
    <TableContainer className={styles.tableContainer}component={Paper} sx={{width: "1000px"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <TableCell />
            <TableCell>Fecha </TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Nro de orden&nbsp;</TableCell>
            <TableCell align="right">Estado&nbsp;</TableCell>
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
                <option value="Rechazada">Rechazada</option>
                <option value="Aprobada">Aprobada</option>
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
          {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((order) => (
            <Row 
            key={order.id} 
            date={order.date}
            total={order.total}
            id={order.id}
            orden={order.orden}
            status={order.estado}
            addOrderToCart={()=> dispatch(addOrderToCart(order.id))}
            openModal={openModal}
            open={open}
            setOpen={setOpen}
            
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
      <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5,10,15,20]}
              component="div"
              colSpan={3}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangesRowsPerPage}
              //ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
    </TableContainer>
    
  );
} 
