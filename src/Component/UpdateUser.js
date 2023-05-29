import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function UpdateUser({ usersData, setUsersData, userId, setModal, ...props }) {
  const userToUpdate = usersData.find((user) => user.id === userId);

  const [formValue, setFormValue] = useState({
    email: userToUpdate.email,
    name: userToUpdate.name,
    role: userToUpdate.role,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedList = usersData.map((item) =>
      item.id === userId ? { ...item, ...formValue } : item
    );
    setUsersData(updatedList);
    setModal(false);
  };

  const { email, name, role } = formValue;

  return (
    <div>
      <Modal {...props} size="sm" centered>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                id="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={email}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="name"
                placeholder="Name"
                onChange={handleChange}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="role"
                placeholder="Role"
                onChange={handleChange}
                value={role}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateUser;
