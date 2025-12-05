import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '@/lib/authenticate'; // 1. Import auth functions

export default function MainNav() {
  const router = useRouter();
  let token = readToken(); // 2. Get the current token

  // 3. Logout function
  function logout() {
    removeToken();
    router.push('/login');
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} href="/">Justin Nguyen</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/about" passHref legacyBehavior><Nav.Link>About</Nav.Link></Link>
            </Nav>
            
            <Nav>
              {token ? (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item>Favourites</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                // NOT LOGGED IN: Show Register & Login
                <div className="d-flex">
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link>Register</Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link>Login</Nav.Link>
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  );
}