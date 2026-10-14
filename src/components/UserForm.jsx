import { Formik, Form as FormikForm } from "formik";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { userSchema } from "../validation/userSchema.js";

const UserForm = ({ initialValues, onSubmit, saving, apiError, isEditing }) =>
{
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <h4 className="mb-4">{isEditing ? "Edit User" : "Add New User"}</h4>
        {apiError && <Alert variant="danger">{apiError}</Alert>}

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={userSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <FormikForm noValidate>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="userName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter full name"
                      isInvalid={touched.name && Boolean(errors.name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="userEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="name@example.com"
                      isInvalid={touched.email && Boolean(errors.email)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="mt-4" disabled={isSubmitting || saving}>
                {(isSubmitting || saving) && (
                  <Spinner as="span" size="sm" animation="border" className="me-2" />
                )}
                {isEditing ? "Update User" : "Save User"}
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}

export default UserForm;