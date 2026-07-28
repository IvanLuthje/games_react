import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Contacto from "./iMovies/Contacto";
import Footer from "./components/layout/Footer";
import Index from "./iMovies/Index";
import Buscar from "./iMovies/Buscar";
import Favoritos from "./iMovies/Favoritos";
import Results from "./iMovies/Results";
import Modal from './components/layout/Modal';

function App(){
    return(
      <div className="App">
        <Router>
        <Header></Header>
        <Nav/>
        <Modal/>

        <Routes>
          <Route path="/" exact element={ <Index />}> </Route>
          <Route path="/Buscar" exact element={ <Buscar />}> </Route>
          <Route path="/contacto" exact element={ <Contacto />}> </Route>
          <Route path="/favoritos" exact element={ <Favoritos />}> </Route>
          <Route path="/game/:id" element={<Results />} />

        </Routes>
  

        </Router>
   
        <Footer/>
      </div>
      
    )
}

export default App;
