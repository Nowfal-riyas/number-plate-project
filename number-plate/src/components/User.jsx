import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Swal from "sweetalert2";

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/alldata")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleClickDelete = (mobile) => {
    fetch(`http://127.0.0.1:5000/removeuser/${mobile}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: "Status!",
            text: "The requested user removed sucessfully",
            icon: "info"
          });
          setUser((prevUsers) =>
            prevUsers.filter((user) => user.mobile !== mobile)
          );
        } else {
          console.error("Error");
        }
      })
      .catch((err) => console.error("Error removing user", err));
  };

  return (
    <div className="user_app">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>State</th>
            <th>Vehicle Number</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr className="table_row" key={user.numberplate}>
              <td>{user.name}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
              <td>{user.region}</td>
              <td>{user.numberplate}</td>
              <td>
                <Link className="table_link" to={`/user/${user.numberplate}`}>
                  Edit
                </Link>
              </td>
              <td>
                <button
                  className="remove_button"
                  onClick={() => handleClickDelete(user.mobile)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
