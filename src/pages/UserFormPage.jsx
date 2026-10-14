import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { Alert, Button, Spinner } from "react-bootstrap";
import UserForm from "../components/UserForm.jsx";
import { addUser, fetchUsers, updateUser } from "../features/users/userSlice.js";
import { getApiError } from "../utils/apiError.js";

const UserFormPage = () => {
  const { id } = useParams();
  const isEditing = id !== undefined;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, listStatus, error, saving } = useSelector((state) => state.users);
  const [submitError, setSubmitError] = useState("");

  // For an edit URL opened directly, GET /api/users loads the record.
  useEffect(() => {
    if (isEditing && listStatus === "idle") dispatch(fetchUsers());
  }, [dispatch, isEditing, listStatus]);

  const user = items.find((item) => String(item.id) === String(id));

  async function handleSubmit(values, { setSubmitting }) {
    setSubmitError("");
    const payload = { name: values.name.trim(), email: values.email.trim() };
    try {
      if (isEditing) {
        await dispatch(updateUser({ id, values: payload })).unwrap();
      } else {
        await dispatch(addUser(payload)).unwrap();
      }
      navigate("/users");
    } catch (error) {
      setSubmitError(getApiError(error));
    } finally {
      setSubmitting(false);
    }
  }

  if (isEditing && (listStatus === "loading" || listStatus === "idle")) {
    return <div className="py-5 text-center"><Spinner animation="border" /> Loading user...</div>;
  }
  if (isEditing && listStatus === "failed") {
    return <Alert variant="danger">{error} <Button size="sm" onClick={() => dispatch(fetchUsers())}>Retry</Button></Alert>;
  }
  if (isEditing && !user) {
    return <Alert variant="warning">User not found. <Link to="/users">Back to users</Link></Alert>;
  }

  return (
    <>
      <Button as={Link} to="/users" variant="link" className="ps-0 mb-3">← Back to Users</Button>
      <UserForm
        isEditing={isEditing}
        initialValues={{ name: user?.name || "", email: user?.email || "" }}
        saving={saving}
        apiError={submitError}
        onSubmit={handleSubmit}
      />
    </>
  );
}
export default UserFormPage;
