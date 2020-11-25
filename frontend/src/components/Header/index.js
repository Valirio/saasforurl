import React from  'react';

import Icone from  '../../assets/logo.png'

function Header(props){
  return(
    <>
    <HeaderContainer>
      <Logo src={Icone} alt="teste"/>
      <h1>INcurtador</h1>
      <p>{props.children}</p>
    </HeaderContainer>
    </>
  );
}

export default Header;