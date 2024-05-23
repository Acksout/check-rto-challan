// import React, { useState } from "react";
// import { data } from "autoprefixer";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const apiKey = process.env.RAPID_API_KEY;
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [challanData, setChallanData] = useState(null);

  const options = {
    method: "POST",
    url: "https://rto-challan-information-verification-india.p.rapidapi.com/api/rc/challaninfo",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host":
        "rto-challan-information-verification-india.p.rapidapi.com",
    },
    data: {
      regn_no: vehicleNumber,
      consent: "yes",
      consent_text:
        "I hear by declare my consent agreement for fetching my information via AITAN Labs API",
    },
  };

  async function makeRequest(options) {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setChallanData(response.data.response);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Config:", error.config);
    }
  }

  const handleInputChange = (event) => {
    setVehicleNumber(event.target.value);
  };

  return (
    <div className="text-white text-center m-auto">
      <div className="m-4">
        <input
          className="input input-bordered input-primary w-full max-w-xs mr-2"
          id="vehNo"
          placeholder="Type Your Vehicle Number Here"
          type="text"
          onChange={handleInputChange}
        />

        <button
          className="btn btn-primary"
          onClick={() => makeRequest(options)}
        >
          Get Details
        </button>
      </div>
      <div className=" lg:container m-auto">
        {challanData && (
          <div>
            <p>
              {/* <p>Status: {challanData.status}</p> */}
              <p>Message: {challanData.message}</p>
              <p>Registration Number: {challanData.regn_no}</p>
              <p>Total Number Of Challans: {challanData.total_challan}</p>
            </p>
            {challanData.results.map((result, index) => (
              <div key={index}>
                <h2>Challan Index Number: {index + 1}</h2>
                <p>Owner Name: {result.owner_name}</p>
                <p>Amount: {result.amount}</p>
                <p>Challan No: {result.challan_no}</p>
                <p>Status: {result.status}</p>
                <p>State Code: {result.state_cd}</p>
                <p>Payment Date: {result.payment_date || "N/A"}</p>
                <p>Vehicle Impound: {result.vehicle_impound}</p>
                <p className="btn btn-primary">
                  PDF:
                  <a
                    href={result.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </p>

                {result.offences.map((offence, idx) => (
                  <div key={idx}>
                    <p>Offence Name: {offence.offence_name}</p>
                    <p>Penalty: {offence.penalty}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
