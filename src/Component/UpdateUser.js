import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

function UpdateUser({usersData,setUsersData,userId, setModal , ...props }) {
    const userToUpdate = usersData.find((user) => user.id === userId);

  const [formValue, setFormValue] = useState({
    email: userToUpdate.email,
    name: userToUpdate.name,
    role: userToUpdate.role,
  });

  const changeHandler = (event) => {
    const { id, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };
  const { email, name, role } = formValue;

  const submitHandler = () => {
    const updatedList = usersData.map((item) => {
      if (item.id === userId) {
        return { ...item, ...formValue };
      }
      return item;
    });
    setUsersData(updatedList);
    setModal(false);
  };

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
              onChange={changeHandler}
              value={email}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="name"
              placeholder="Name"
              onChange={changeHandler}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="role"
              placeholder="Role"
              onChange={changeHandler}
              value={role}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={submitHandler}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  

    </div>
  )
}

export default UpdateUser
