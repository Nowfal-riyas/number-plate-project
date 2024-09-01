import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AddNew from "./components/AddNew.jsx";
import ExUser from "./components/ExUser.jsx";
import User from "./components/User.jsx";
import Update from "./components/Update.jsx";

const App = () => {
  const [inputvalue, setInputvalue] = useState("");
  const [value, setValue] = useState("");
  const [place, setPlace] = useState("");
  const [valid, setValid] = useState(true)
  const [error, setError] = useState(0)
  const [output, setOutput] = useState(0)

  const region = [
    { name: "Tamilnadu", sign: "TN" },
    { name: "Kerala", sign: "KL" },
    { name: "Andhra Pradesh", sign: "AP" },
    { name: "Karnataka", sign: "KA" },
    { name: "Arunachal Pradesh", sign: "AR" },
    { name: "Assam", sign: "AS" },
    { name: "Bihar", sign: "BR" },
    { name: "Chattisgarh", sign: "CG" },
    { name: "Delhi", sign: "DL" },
    { name: "Goa", sign: "GA" },
    { name: "Gujarat", sign: "GJ" },
    { name: "Haryana", sign: "HR" },
    { name: "Himachal Pradesh", sign: "HP" },
    { name: "Jammu and Kashmir", sign: "JK" },
    { name: "Jharkhand", sign: "JH" },
    { name: "Lakshadweep Islands", sign: "LD" },
    { name: "Madhya Pradesh", sign: "MP" },
    { name: "Maharashtra", sign: "MP" },
    { name: "Maharashtra", sign: "MH" },
    { name: "Manipur", sign: "MN" },
    { name: "Meghalaya", sign: "ML" },
    { name: "Mizoram", sign: "MZ" },
    { name: "Nagaland", sign: "NL" },
    { name: "Odisha", sign: "OR" },
    { name: "Pondicherry", sign: "PY" },
    { name: "Punjab", sign: "PB" },
    { name: "Rajasthan", sign: "RJ" },
    { name: "Sikkim", sign: "SK" },
    { name: "Telangana", sign: "TS" },
    { name: "Tripura", sign: "TR" },
    { name: "Uttar Pradesh", sign: "UK" },
    { name: "West Bengal", sign: "WB" },
    { name: "Andaman and Nicobar islands", sign: "AN" },
    { name: "Chandigarh", sign: "CH" },
    { name: "Dadra & Nagar Haveli", sign: "DN" },
    { name: "Daman & Diu", sign: "DD" },
    { name: "Ladakh", sign: "LA" },
    { name: "Uttarakhand", sign: "UA" },
    { name: "Odisha", sign: "OD" },
    { name: "Other Territory", sign: "OT" },
  ];
  const handleChange = (e) => {

    let input = e.target.value.toUpperCase().trim();
    setInputvalue(input)

    const pattern = /^[A-Z]{2}\d{2}[A-Z]{1,}\d{4}$/
    setValid(pattern.test(input))
    
  };

  const handleClick = () => {
    if (valid == true){
    let inputSign = inputvalue.slice(0,2)
    let inputNumber = inputvalue.slice(-4)
      for (let i = 0; i < region.length; i++) {
        if (region[i].sign.toLowerCase() == inputSign.toLowerCase())  {
          setPlace(region[i].name);
          setValue(inputNumber);
          setOutput(1)
          setError(0)
      }
    }
  }else{
    setError(1)
    setOutput(0)
  }
  };

  const handleResetClick = () => {
    setPlace("")
    setInputvalue("");
    setValue("")
    setError(0)
    setOutput(0)
  };

  return (
    <div className="app">
      <Nav
        inputvalue={inputvalue}
        handleChange={handleChange}
        handleClick={handleClick}
        handleResetClick={handleResetClick}
      />
      <main className="app_main">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                place={place}
                value={value}
                error ={error}
                output ={output}
              />
            }
          />
          <Route path="/addnew" element={<AddNew />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:numberplate" element={<Update />} />
          <Route path="/exuser" element={<ExUser />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
