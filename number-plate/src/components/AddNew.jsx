import React, { useState } from "react";
import "./AddNew.css";
import Swal from "sweetalert2";

const AddNew = () => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [numberplate, setNumberplate] = useState("");

  const handleResetClick = () => {
    setName("");
    setRegion("");
    setMobile("");
    setEmail("");
    setNumberplate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addnew = {
      name,
      region,
      mobile,
      email,
      numberplate,
    };

    fetch("http://127.0.0.1:5000/addinformation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addnew),
    })
      .then(response => response.json())
      .then(data =>
        data.success
          ? (
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Data added successfully',
              }),
              setName(""),
              setMobile(""),
              setEmail(""),
              setRegion(""),
              setNumberplate("")
            )
          : Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'User already exists or other error occurred',
            })
      )
      .catch((err) => console.error("Error while updating data:", err));
  };

  return (
    <div className="add_app">

      <form onSubmit={handleSubmit} method="post">
        <div className="input_row1">
          <label htmlFor="">Name:</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
          />

          <label htmlFor="">State:</label>

          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            name="state"
            required
          />
        </div>
        <div className="input_row2">
          <label htmlFor="">Mobile:</label>

          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength="10"
            required
          />

          <label htmlFor="">Email Id:</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
        </div>
        <div className="input_row3">
          <label htmlFor="">Vehicle Number:</label>

          <input
            type="text"
            maxLength="10"
            value={numberplate}
            onChange={(e) => setNumberplate(e.target.value)}
            number="numberplate"
            pattern="[A-Z]{2}\d{2}[A-Z]{1,}\d{4}"
            title="The format should be in (e.g TN99X9999 or TN99XX9999 ) "
            required

          />

          <button className="add_user_submit" type="submit">Submit</button>

          <button className="add_user_reset" type="reset" onClick={handleResetClick}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
