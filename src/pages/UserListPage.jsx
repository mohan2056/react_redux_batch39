import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Alert, Badge, Button, Card, Form, Modal, Spinner, Table,
} from "react-bootstrap";
import { deleteUser, fetchUsers } from "../features/users/userSlice.js";
import { getApiError } from "../utils/apiError.js";

const UserListPage = () => {
  const dispatch = useDispatch();
  const { items, listStatus, error, deletingId } = useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase().trim();
    return items.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(term)
    );
  }, [items, search]);

  async function confirmDelete() {
    if (!userToDelete) return;
    setDeleteError("");
    try {
      await dispatch(deleteUser(userToDelete.id)).unwrap();
      setUserToDelete(null);
    } catch (error) {
      setDeleteError(getApiError(error));
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <h2 className="mb-1">Users</h2>
          <p className="text-secondary mb-0">Data from your existing Node.js + MySQL API</p>
        </div>
        <Button as={Link} to="/users/new">+ Add User</Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between gap-3 mb-3 flex-wrap">
            <Form.Control
              aria-label="Search users"
              className="search-box"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Badge bg="secondary">{filteredUsers.length} users</Badge>
          </div>

          {listStatus === "loading" && (
            <div className="py-4 text-center"><Spinner animation="border" /> Loading users...</div>
          )}
          {listStatus === "failed" && (
            <Alert variant="danger">
              {error} <Button size="sm" variant="outline-danger" onClick={() => dispatch(fetchUsers())}>Retry</Button>
            </Alert>
          )}
          {listStatus === "succeeded" && (
            <Table responsive hover className="align-middle mb-0">
              <thead className="table-light">
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Created</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-secondary py-4">No users found.</td></tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td className="fw-semibold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</td>
                      <td className="action-buttons">
                        <Button size="sm" variant="outline-secondary" as={Link} to={`/users/${user.id}`}>View</Button>{" "}
                        <Button size="sm" variant="outline-primary" as={Link} to={`/users/${user.id}/edit`}>Edit</Button>{" "}
                        <Button size="sm" variant="outline-danger" onClick={() => { setDeleteError(""); setUserToDelete(user); }}>Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={Boolean(userToDelete)} onHide={() => setUserToDelete(null)} centered>
        <Modal.Header closeButton><Modal.Title>Delete User?</Modal.Title></Modal.Header>
        <Modal.Body>
          Delete <strong>{userToDelete?.name}</strong>? This operation cannot be undone.
          {deleteError && <Alert className="mt-3" variant="danger">{deleteError}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUserToDelete(null)}>Cancel</Button>
          <Button variant="danger" disabled={deletingId !== null} onClick={confirmDelete}>
            {deletingId !== null ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserListPage;