import React from 'react';

import {BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-materialize';

import ExibeBolsistas from '../acoes/ExibeBolsistas';
import CadastraBolsista from '../acoes/CadastraBolsista';
import Paginacao from '../acoes/Paginacao';
const BodyCadastro = () => {

  return(
    <BrowserRouter>
      <Container>
      <Row>
        <Col s={2} m={2} className="colunaLateral">
          <div><Link to="/bolsistas">Principal</Link></div>
          {/* Passando props via link para Component por meio do state */}
          <div><Link to={{ pathname: "/bolsistas/cadastro", state: { tipo: "cadastro", dadosBolsista: " "}  }}>Cadastrar</Link></div>
          <div><Link to="/bolsistas/ex-bolsista">Ex-Bolsistas</Link></div>
          <div><Link to="#">Links (Central)</Link></div>
        </Col>
        <Col s={10} m={10} className="grey">
          <Switch>
            <Route exact path="/bolsistas">
              <ExibeBolsistas tipo="Bolsista"/>
            </Route>
            {/* Formato de "Route" a ser utilizado com props no "Link" */}
            <Route path="/bolsistas/cadastro" component={CadastraBolsista} />
            <Route path="/bolsistas/ex-bolsista">
              <Paginacao tipo="Ex-Bolsista"/>
            </Route>
            <Route path="/bolsistas/atualizar" component={CadastraBolsista} />
          </Switch>
        </Col>
      </Row>
      </Container>
    </BrowserRouter>
  );
}

export default BodyCadastro;

/*

className="blue">

    //<div><Link to="/bolsistas/cadastro">Cadastrar</Link></div>

<div><a href="/bolsistas">Principal</a></div>
<div><a href="bolsistas/cadastro">Cadastrar</a></div>
<div><a href="#">Ex-Bolsistas</a></div>
<div><a href="#">Links (Central)</a></div>

/*<CadastraBolsista />
tipo="Cadastrar" bolsista=" "/>
</Route>*/

/*<CadastraBolsista />
//tipo="Atualizar" bolsista={}/>
</Route>

<Route path="/bolsistas/:tipo" component={CadastraBolsista} />

<Route path="/bolsistas/:tipo/:dados" component={CadastraBolsista} />

*/
