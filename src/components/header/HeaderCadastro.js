import React from 'react';

import { Container, Row } from 'react-materialize';

const HeaderCadastro = () => {

  return(
    <Container>
      <Row>
      <div class="headerLogo">
        <h5 class="titulo">Cadastro dos Bolsistas</h5>
      </div>
      </Row>
    </Container>
  )

}

export default HeaderCadastro;

/*
<div class="headerLogo">
  <h5 class="titulo">Cadastro dos Bolsistas</h5>
</div>



--------------------------------------------------------------------------------
<div style={{ backgroundImage: `url(${logo})`, backgroundSize: "cover", height: "25vh" }}>
  <h5 style={{ textAlign: 'center', margin: 'auto', paddingTop: '8vh', color: 'white', fontType: 'bold' }}>Labinfo</h5>
</div>

--------------------------------------------------------------------

<Navbar
  alignLinks="right"
  brand={<a href="#"><img src="Logo_Labinfo.png" alt="" class="logoLabinfo" /></a>}
  id="mobile-nav"
  menuIcon={<Icon>menu</Icon>}
  className="light-blue accent3"
  >
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
</Navbar>

*/
