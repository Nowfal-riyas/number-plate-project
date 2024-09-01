import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const { numberplate } = useParams();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/getinfo/${numberplate}`)
      .then((response) => response.json())
      .then((data) => {
        setMobile(data.mobile);
        setEmail(data.email);
      })
      .catch((err) => console.error("Error fetching details:", err));
  }, []);

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/adduser/${numberplate}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.name)
        Swal.fire({
          title: "Update Status",
          text: "User Information Has Been Updated",
          icon: "success"
        });
        navigate("/user");
      })
      .catch(err => console.error("Error Updating User:", err));
  };

  return (
    <div className="update_app">
      <form method="" onSubmit={handleUpdateSubmit}>
        <div className="mobile_update">
          <label className="label_mobile" htmlFor="">
            Mobile No:
          </label>
          <input
            type="text"
            maxLength="10"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="email_update">
          <label className="label_email" htmlFor="">
            Email Id:
          </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button className="update_button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
