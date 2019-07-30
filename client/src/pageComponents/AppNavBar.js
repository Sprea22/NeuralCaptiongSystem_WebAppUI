<Navbar style={{backgroundColor : 'gray'}} dark expand='sm' className='mb-5'>
<Container>
  <NavbarToggler onClick={this.toggle} />
  <Collapse isOpen={this.state.isOpen} navbar>
    <Nav className='ml-auto' align="left" navbar>
    <NavItem>
      <NavLink href='/'> Homepage </NavLink>
    </NavItem>  
    <NavItem>
      <NavLink href='/stock-charts'>  Plots collection </NavLink>    
    </NavItem>
    <NavItem>
      <NavLink href='/contribute'> Contribute </NavLink>    
    </NavItem>
    <NavItem>
      <NavLink href='/demo'> Demo </NavLink>    
    </NavItem>
    </Nav>
  </Collapse>
</Container>
</Navbar>
