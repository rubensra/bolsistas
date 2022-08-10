import React from 'react';

import { NavItem, Row } from 'react-materialize';

const NavCadastro = () => {

  return(
    <Row>
    <NavItem href="#">
      Principal
    </NavItem>
    <NavItem href="#">
      Cadastro
    </NavItem>
    <NavItem href="#">
      Ex-Bolsistas
    </NavItem>
    <NavItem href="#">
      Links(Central)
    </NavItem>
    </Row>
  );
}

export default NavCadastro;
