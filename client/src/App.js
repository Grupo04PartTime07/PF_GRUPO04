import './App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar.jsx'
import Home from './components/home/home';
import Footer from './components/footer/footer.jsx';
import CategoriesList from './components/categoriesList/categoriesList'
import Detail from './components/detail/detail.jsx';
import Marcas from './components/Brands/brands';
import Categorie from './components/categorie/categorie';
import CategoryForm from './components/categoryForm/categoryForm';



function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
          <div className="App">
            <Route path='/' component={Navbar}/>
            <Route exact path='/' component={Home}/>
            <Route path='/Categorias' component={CategoriesList}/>
            <Route exact path='/products' component={Categorie}/>
            <Route exact path="/products/:id" component={Detail} />
            <Route exact path="/Marcas" component={Marcas} />
            <Route exact path='/createCategory' component={CategoryForm}/>
            <Route path="/" component={Footer} />
          </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
