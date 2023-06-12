import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CustomNavbar = ()=>{
    return(
        <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/"><Navbar.Brand>Home</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to ="/create"><Nav.Item>Create</Nav.Item></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default CustomNavbar;