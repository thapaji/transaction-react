import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUser } from "../userContext";

export const TopNav = () => {
  const handleLogOut = () => {
    localStorage.removeItem("user");
  };
  const { setLogedInUser, logedInUser } = useUser();

  return (
    <Navbar expand="md" className="bg-info shadow-lg">
      <Container>
        <Navbar.Brand href="/">T-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {logedInUser?._id ? (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/" onClick={handleLogOut}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
