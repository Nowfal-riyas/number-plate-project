import React, { useState } from "react";
import "./ExUser.css";
import Swal from "sweetalert2";

const ExUser = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([])

  const handleClick = () => {
    fetch(`http://127.0.0.1:5000/info/${inputValue}`)
      .then((response) =>  response.json())
      .then((data) => {
        data.error ?(
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Not Found!",
            footer: ''
          })
          
        ):
          setSearchResult(data)
      })
      .catch(error => console.error('Error fetching data:', error));

      console.log(searchResult)
  };

  return (
    <div>
      <div className="user_find_app">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter Mobile, Email, or Vehicle Number"
          onChange={(e) => setInputValue(e.target.value)}
          required
        />

        <button onClick={handleClick}>Search</button>
      </div>
      
      {searchResult && (
        <div className="user_list">
          <p>The Requested User Information:</p>
          <ul>
            <li><strong>Name:</strong> {searchResult.name}</li>
            <li><strong>Email:</strong> {searchResult.email}</li>
            <li><strong>Mobile:</strong> {searchResult.mobile}</li>
            <li><strong>State:</strong> {searchResult.region}</li>
            <li><strong>Vehicle Number:</strong> {searchResult.numberplate}</li>
          </ul>
        </div>)}
    
      </div>
  
  );
};

export default ExUser;
