import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Navigate, Route, Routes } from "react-router";
import UserListPage from "./pages/UserListPage.jsx";
import UserFormPage from "./pages/UserFormPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/users">Batch 39 • User CRUD</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/users">Users</Nav.Link>
              <Nav.Link as={Link} to="/users/new">Add User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/:id/edit" element={<UserFormPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </Container>
    </>
  );
}
