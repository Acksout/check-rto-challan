// import React from "react";
// import axios from "axios";
// import { useState } from "react";

// function App() {
//   const [regnNumber, setRegnNumber] = useState("");
//   const [data, setData] = useState(null);

//   const options = {
//     method: "POST",
//     url: "https://rto-challan-information-verification-india.p.rapidapi.com/api/rc/challaninfo",
//     headers: {
//       "content-type": "application/json",
//       "X-RapidAPI-Key": "process.env.RAPID_API_KEY",
//       "X-RapidAPI-Host":
//         "rto-challan-information-verification-india.p.rapidapi.com",
//     },
//     data: {
//       regn_no: { regnNumber },
//       consent: "yes",
//       consent_text:
//         "I hear by declare my consent agreement for fetching my information via AITAN Labs API",
//     },
//   };

//   const handleClick = async () => {
//     try {
//       const response = await axios.request(options);
//       console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="">
//       <h1>Check Active RTO Challan</h1>
//       {/* Input Div */}
//       <div className="m-2">
//         <input
//           type="text"
//           value={regnNumber}
//           onChange={(e) => setRegnNumber(e.target.value)}
//           placeholder="Enter Vehicle Number"
//           className="input m-2 input-bordered w-full max-w-xs"
//         />
//         {/* on button click send the data to regn_no */}
//         <button
//           className="m-2 btn btn-active btn-primary"
//           onClick={handleClick}
//         >
//           Send
//         </button>
//       </div>
//       {/* Output Div */}
//       <div>
//         <p>Number of challans: {setData.data.results.total_challan}</p>
//         <p>Challan Number: </p>
//         <p>Offence Name: {setData.data.results.offences.offence_name} </p>
//         <p>Penalty: ₹{setData.data.results.offences.penalty}</p>
//         <p>PDF Link: {setData.data.results.pdf_url}</p>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import axios from "axios";
import { useState } from "react";
// import dotenv from "dotenv";

function App() {
  const [regnNumber, setRegnNumber] = useState("");
  const [data, setData] = useState(null);
  const [dataReceived, setDataReceived] = useState(false);

  const options = {
    method: "POST",
    url: "https://rto-challan-information-verification-india.p.rapidapi.com/api/rc/challaninfo",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "ADD API KEY HERE",
      "X-RapidAPI-Host":
        "rto-challan-information-verification-india.p.rapidapi.com",
    },
    data: {
      regn_no: regnNumber,
      consent: "yes",
      consent_text:
        "I hear by declare my consent agreement for fetching my information via AITAN Labs API",
    },
  };

  const handleClick = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
    setDataReceived(true);
  };

  return (
    <div className="text-center m-2">
      <h1 className="text">Check Active RTO Challan</h1>
      {/* Input Div */}
      <div className="m-2">
        <input
          type="text"
          value={regnNumber}
          onChange={(e) => setRegnNumber(e.target.value)}
          placeholder="Enter Vehicle Number"
          className="input m-2 input-bordered w-full max-w-xs"
        />
        {/* on button click send the data to regn_no */}
        <button
          className="m-2 btn btn-active btn-primary"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
      {/* Output Div */}

      {dataReceived && data.results && (
        <div className="">
          <p>Number of challans: {data.results.total_challan}</p>
          <p>Challan Number: </p>
          {data.results.offences && (
            <p>Offence Name: {data.results.offences.offence_name} </p>
          )}
          {data.results.offences && (
            <p>Penalty: ₹{data.results.offences.penalty}</p>
          )}
          <p>PDF Link: {data.results.pdf_url}</p>
        </div>
      )}

      {/* <div>
        <p>Number of challans: TEST</p>
        <p>Challan Number: TEST </p>
        <p>Offence Name: TEST </p>
        <p>Penalty: ₹TEST</p>
        <p>PDF Link: TEST</p>
      </div> */}
    </div>
  );
}

export default App;
