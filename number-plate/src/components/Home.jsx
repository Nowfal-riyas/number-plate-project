import React from "react";
import "./Home.css";

const Home = ({ place, output, value, error}) => {

  console.log(error, output)
  return (
    <div>
      {output == 1 || error == 0 ? (
        <div className="result">
          <p className="result_header">Vehicle Information:</p>
          <p className="result_text">This Vehicle Belongs to : {place}</p>
          <p className="result_text">The Vehicle Number is : {value}</p>
          <p className="result_text">Click Reset To Clear Field</p>
        </div>
      ) : (
        error == 1 && (
          <p className="result_text_error">
            Enter Valid Vehicle Number (e.g. TN00XX0000)
          </p>
        )
      )}
    </div>
  );
};

export default Home;
