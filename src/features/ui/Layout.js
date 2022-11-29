import { Link, Outlet } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Code Sass POS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-items" />
          <Navbar.Collapse id="nav-items">
            <Nav className="me-auto">
              <NavDropdown title="Products">
                <NavDropdown.Item as={Link} to="/products">
                  All Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/products/new">
                  Create Product
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              <Nav.Link as={Link} to="/orders">
                Orders
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-2">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
