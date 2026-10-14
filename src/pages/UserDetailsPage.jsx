import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { fetchUsers } from "../features/users/userSlice.js";

const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, listStatus, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (listStatus === "idle") dispatch(fetchUsers());
  }, [dispatch, listStatus]);

  const user = items.find((item) => String(item.id) === String(id));

  if (listStatus === "loading" || listStatus === "idle") {
    return <div className="py-5 text-center"><Spinner animation="border" /> Loading user...</div>;
  }
  if (listStatus === "failed") return <Alert variant="danger">{error}</Alert>;
  if (!user) return <Alert variant="warning">User not found.</Alert>;

  return (
    <>
      <Button as={Link} to="/users" variant="link" className="ps-0 mb-3">← Back to Users</Button>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <h3 className="mb-4">User Details</h3>
          <dl className="row mb-3">
            <dt className="col-sm-3">ID</dt><dd className="col-sm-9">{user.id}</dd>
            <dt className="col-sm-3">Name</dt><dd className="col-sm-9">{user.name}</dd>
            <dt className="col-sm-3">Email</dt><dd className="col-sm-9">{user.email}</dd>
            <dt className="col-sm-3">Created At</dt>
            <dd className="col-sm-9">
              {user.created_at ? new Date(user.created_at).toLocaleString() : "—"}
            </dd>
          </dl>
          <Button as={Link} to={`/users/${id}/edit`}>Edit User</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default UserDetailsPage;