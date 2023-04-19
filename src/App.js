import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./App.css";
import UpdateUser from "./Component/UpdateUser";
import Paginations from "./Component/Paginations";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [filteredId, setFilteredId] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [selectId, setSelectId] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [currentPage, setCurrentpage] = useState(1);
  const Users_Per_Page = 10;

  const fetchData = async () => {
    try {
      await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
        .then((res) => res.json())

        .then((json) => {
          setUsersData(json);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = (userId) => {
    setUpdateId(userId);
    setModal(true);
  };

  const onDelete = (userId) => {
    const updatedUsersList = usersData.filter((user) => user.id !== userId);
    setUsersData(updatedUsersList);
  };

  const onSelect = (event) => {
    const userId = event.target.value;
    let updatedUsersList = [...selectId];
    if (event.target.checked) {
      updatedUsersList = [...selectId, userId];
    } else {
      setAllChecked(false);
      updatedUsersList.splice(selectId.indexOf(userId), 1);
    }
    setSelectId(updatedUsersList);
  };

  const onSelectAll = (event) => {
    let updatedUsersList = [...selectId];
    if (event.target.checked) {
      setAllChecked(true);
      updatedUsersList = currentUser.map((user) => user.id);
    } else {
      setAllChecked(false);
      updatedUsersList = [];
    }
    setSelectId(updatedUsersList);
  };

  const deleteSelected = () => {
    const updatedUsersList = usersData.filter(
      (member) => !selectId.includes(member.id)
    );
    setUsersData(updatedUsersList);
    setAllChecked(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filter = () => {
    if (searchData !== "") {
      const result = usersData.filter((obj) =>
        Object.keys(obj).some((key) => obj[key].includes(searchData))
      );
      setFilteredId(result);
    } else {
      setFilteredId(usersData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filter();
  }, [filter, usersData]);

  // Pagination

  const lastIndex = currentPage * Users_Per_Page;
  const firstIndex = lastIndex - Users_Per_Page;
  const currentUser = filteredId.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredId.length / Users_Per_Page);

  const setPage = (pageNumber) => setCurrentpage(pageNumber);

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
                onChange={onSelectAll}
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
            currentUser
              .filter((user) => {
                if (searchData === "") return user;
                else if (
                  user.name.includes(searchData) ||
                  user.email.includes(searchData) ||
                  user.role.includes(searchData)
                ) {
                  return user;
                }
              })

              .map((user) => {
                return (
                  <tr key={user.id}>
                    <th scope="row">
                      <Form.Check
                        type="checkbox"
                        value={user.id}
                        onChange={onSelect}
                        checked={selectId.includes(user.id)}
                      />
                    </th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => updateUser(user.id)}
                      >
                        <i className="bi bi-pencil-square text-dark"></i>
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => onDelete(user.id)}
                      >
                        <i className="bi bi-trash text-danger"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No User Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {currentUser.length > 0 ? (
        <>
          <Button
            variant="danger"
            size="sm"
            onClick={deleteSelected}
            disabled={selectId.length > 0 ? false : true}
          >
            Delect Selected
          </Button>
          <Paginations
            currentPage={currentPage}
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        ""
      )}
      {modal ? (
        <UpdateUser
          usersData={usersData}
          setUsersData={setUsersData}
          userId={updateId}
          setModal={setModal}
          show={modal}
          onHide={() => setModal(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
