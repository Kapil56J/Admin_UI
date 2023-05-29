
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./App.css";
import UpdateUser from "./Component/UpdateUser";
import Paginations from "./Component/Paginations";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const UsersPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchData, usersData]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (userId) => {
    setUpdateId(userId);
    setModal(true);
  };

  const handleDelete = (userId) => {
    const updatedUsers = usersData.filter((user) => user.id !== userId);
    setUsersData(updatedUsers);
  };

  const handleSelectRow = (event) => {
    const userId = event.target.value;
    let updatedSelectedUsers = [...selectedUsers];
    if (event.target.checked) {
      updatedSelectedUsers = [...selectedUsers, userId];
    } else {
      setAllChecked(false);
      updatedSelectedUsers.splice(selectedUsers.indexOf(userId), 1);
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleSelectAll = (event) => {
    let updatedSelectedUsers = [...selectedUsers];
    if (event.target.checked) {
      setAllChecked(true);
      updatedSelectedUsers = filteredUsers.map((user) => user.id);
    } else {
      setAllChecked(false);
      updatedSelectedUsers = [];
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleDeleteSelected = () => {
    const updatedUsers = usersData.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUsersData(updatedUsers);
    setAllChecked(false);
  };

  const filterUsers = () => {
    if (searchData !== "") {
      const result = usersData.filter((user) =>
        Object.values(user).some((value) =>
          value.toLowerCase().includes(searchData.toLowerCase())
        )
      );
      setFilteredUsers(result);
    } else {
      setFilteredUsers(usersData);
    }
  };

  const lastIndex = currentPage * UsersPerPage;
  const firstIndex = lastIndex - UsersPerPage;
  const currentUser = filteredUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredUsers.length / UsersPerPage);

  const setPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Form.Control
        type="text"
        placeholder="Search By Name, Email or Role"
        onChange={(e) => setSearchData(e.target.value)}
      />
      <br />

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleSelectAll}
                checked={allChecked}
              />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.length ? (
            currentUser.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                selected={selectedUsers.includes(user.id)}
                handleSelectRow={handleSelectRow}
                updateUser={updateUser}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No User Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {currentUser.length > 0 && (
        <>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteSelected}
            disabled={selectedUsers.length === 0}
          >
            Delete Selected
          </Button>
          <Paginations
            currentPage={currentPage}
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      )}

      {modal && (
        <UpdateUser
          usersData={usersData}
          setUsersData={setUsersData}
          userId={updateId}
          setModal={setModal}
          show={modal}
          onHide={() => setModal(false)}
        />
      )}
    </div>
  );
}

function UserRow({ user, selected, handleSelectRow, updateUser, handleDelete }) {
  return (
    <tr>
      <th scope="row">
        <Form.Check
          type="checkbox"
          value={user.id}
          onChange={handleSelectRow}
          checked={selected}
        />
      </th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <Button variant="link" size="sm" onClick={() => updateUser(user.id)}>
          <i className="bi bi-pencil-square text-dark"></i>
        </Button>
        <Button variant="link" size="sm" onClick={() => handleDelete(user.id)}>
          <i className="bi bi-trash text-danger"></i>
        </Button>
      </td>
    </tr>
  );
}

export default App;
