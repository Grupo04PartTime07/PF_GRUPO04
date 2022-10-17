import './App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar.jsx'
import Home from './components/home/home';
import Footer from './components/footer/footer.jsx';
import CategoriesList from './components/categoriesList/categoriesList'
import Detail from './components/detail/detail.jsx';
import CreateProduct from './components/createProduct/CreateProduct';


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
          <div className="App">
            <Route path='/' component={Navbar}/>
            <Route exact path='/' component={Home}/>
            <Route path='/Categorias' component={CategoriesList}/>
            <Route exact path="/products/:id" component={Detail} />
            {/* modificar la ruta segun convenga */}
            <Route exact path="/createProduct" component={CreateProduct} />
            <Route path="/" component={Footer} />
          </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
