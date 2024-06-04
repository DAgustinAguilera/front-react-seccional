import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormContainer } from './components/FormContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import Inicio from './components/Inicio.';
import Informe from './components/Informe';
import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/reportes" element={<FormContainer />} />
        <Route path="/informe" element={<Informe/>} />
      </Routes>
    </Router>
  );
}

export default App;