import { useEffect } from "react";

import 'materialize-css';

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import CadastroBolsistas from './CadastroBolsistas';

import M from "materialize-css";


function App() {

  useEffect(() => {
    M.AutoInit();
  },[]);

  return (
    <BrowserRouter>
      <CadastroBolsistas />
    </BrowserRouter>
  );
}

export default App;
