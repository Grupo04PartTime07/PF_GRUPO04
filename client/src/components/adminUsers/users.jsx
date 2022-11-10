import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './users.css'
import TextField from "@mui/material/TextField";
import UserForm from "./userForm";
import { getAllUsers } from "../../redux/actions/get_all_users"
import { getUserModificar } from "../../redux/actions/get_user_modificar";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import 'react-responsive-modal/styles.css';
import EnhancedTable from "./resultsUsers";

const { BACK_URL = 'http://localhost:3001' } = process.env

export default function UpdateInventory(){
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [currentUser, setUser] = useState({})
    const [display, setDisplay] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const userModificar = useSelector((state) => state.userModificar)
    const [search, setSearch] = useState("")
    const filterData = (query, data) => {
        if (!query) {
          return data;
        } else {
          return data.filter((d) => d.email.toLowerCase().includes(query));
        }
    };

    useEffect(() => {
        dispatch(getAllUsers())
        console.log(users)
        return () => {
         
        };
    }, [dispatch]);

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    function searchSubmit(e){
        e.preventDefault()
        //dispatch(cleanProductState())
        dispatch(getAllUsers())
        //setSearch("")
    }

    function clearCurrent (){
        setSearchQuery("");
        setUser({});
    }

    const getUsuario = (id) => {
        
        return fetch(`${BACK_URL}/users/${id}`)
        .then(res => res.json())
        .then(obj =>  alert ("el usaurio es " + obj.email)  )
       
        .catch(err => console.log(err));
     
    } 
    
    function displayUserForm(e, users){
        //abrirModal=true;
        const mostrar = users.filter(user => user.email == e.target.id)[0];
        console.table(mostrar);
      //  <ModalUser usuario="holanda">dsadsa</ModalUser>
        
        //console.table(aa);
        //onOpenModal()
       dispatch(getUserModificar(mostrar.email)) 
    }

    function displayUserForm(e){
        setDisplay(e.target.id)
        setUser(users.find(u => u.email == e.target.id))
    }

    const dataFiltered = filterData(searchQuery, users);

    return(
        
        <div>
        <div className="forthasearchingg">
            <div className='forthasearchcontainer'>
                <div className='tharealcontainerr'>          
                    <form className="search4brandd">
                        <TextField
                            sx={{ backgroundColor: 'white', borderRadius: '7px'}}
                            id="search-bar"
                            className="text"
                            onInput={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            label="Busca un usuario por email"
                            variant="outlined"
                            placeholder="Busca..."
                            size="small"
                        />
                        {/* <IconButton type="submit" aria-label="search">
                         <SearchIcon/>
                        </IconButton> */}
                    </form>

                    {dataFiltered && dataFiltered.length? <EnhancedTable rows={dataFiltered} displayUserForm={displayUserForm}></EnhancedTable>:null}           
                   
                    {/* <div className="resultcontainer"> */}
                        { /*users && products.length ?
                            <div className="itemscontainer">
                            <label className="labelheader">  </label>
                            <label className="labelheader">Producto  </label>
                            <label className="labelheader">Cant.  </label>
                            <label>  </label>
                            <label>  </label>
                            <label>  </label>
                        </div> : null}
                        { products && products.length ?
                            products.map(p => {
                                return(
                                    <div className="itemscontainer">
                                        <img src={p.image[0]} width={"30px"} height={"35px"} />
                                        <label className="itemlabel">{p.name}</label>
                                        <label className="itemlabel">{p.stock}</label>
                                        <button name={p.id} className="searchbtn" onClick={()=>{}}>&#8594;</button>
                                        {display && display == p.id ? <input type="number" className="stockinput" min="0" max="1000" value={input.stock} name={p.id} onChange={(e)=>handleInputChange(e)}/> : null }
                                        {display && display == p.id ? <button className="searchbtn" onClick={handleSubmitInventory}>Guardar</button>: null }
                                    </div>
                                )
                            }): null
                        }
                        { productdetail && productdetail.name ? 
                        <div>
                            <img src={productdetail.image[0]} width={"30px"} height={"35px"} />
                            <label>{productdetail.name}</label>
                            <label>{productdetail.stock}</label>
                        </div>
                        : null */}
                    {/* </div> */}
                    {/* {console.log(users)} */}
                    {/* {users && users.length? <EnhancedTable rows={users} displayUserForm={displayUserForm}></EnhancedTable>:null}            */}
                    </div>
                    {/* {userModificar && abrirModal ? <ModalUser usuario="holanda"></ModalUser> : console.log(userModificar+" nada")}
         */}
                    {currentUser && display == currentUser.email ? <div><UserForm usuario={currentUser} setDisplay={setDisplay} clearCurrent={clearCurrent}/></div> : null}
          
                {/* {productdetail && display == productdetail.id ? <div><CreateProduct product={productdetail} ></CreateProduct></div> : null} */}
                   </div>
        </div>
     
        
        </div>
    )
}