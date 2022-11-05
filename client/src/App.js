import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './components/navbar/navbar.jsx'
import Home from './components/home/home';
import Footer from './components/footer/footer.jsx';
import CategoriesList from './components/categoriesList/categoriesList'
import Detail from './components/detail/detail.jsx';
import Marcas from './components/Brands/brands';
import Categorie from './components/categorie/categorie';
import CategoryForm from './components/categoryForm/categoryForm';
import BrandForm from './components/brandForm/brandForm';
import CreateProduct from './components/createProduct/CreateProduct';
import Brand from './components/Brands/brand_products';
import ShoppingCartBig from './components/shoppingCartBig/shoppingCart';
import WishList from './components/wishList/wishList';
import Profile from './components/profile/profile';
import Feedback from './components/feedback/feedback';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/busqueda' component={Home} />
            <Route exact path='/Categorías' component={CategoriesList} />
            <Route exact path='/products' component={Categorie} />
            <Route exact path="/products/:id" component={Detail} />
            <Route exact path="/createProduct" component={CreateProduct} />
            <Route exact path="/myProfile" component={Profile} />
            <Route exact path="/Marcas" component={Marcas} />
            <Route exact path='/createCategory' component={CategoryForm} />
            <Route exact path='/createBrand' component={BrandForm} />
            <Route exact path='/brands' component={Brand} />
            <Route exact path='/shoppingCart' component={ShoppingCartBig} />
            <Route exact path='/wishList' component={WishList} />
            <Route exact path='/feedback' component={Feedback} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Route path="/" component={Footer} />
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}


export default App;

function NotFound (){
  return <img src='https://marj3y.com/wp-content/uploads/2022/03/Error-404.jpg'/>
}
