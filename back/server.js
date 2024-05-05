const axios = require("axios");

const options = {
  method: "POST",
  url: "https://rto-challan-information-verification-india.p.rapidapi.com/api/rc/challaninfo",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "process.env.RAPID_API_KEY",
    "X-RapidAPI-Host":
      "rto-challan-information-verification-india.p.rapidapi.com",
  },
  data: {
    regn_no: {},
    consent: "yes",
    consent_text:
      "I hear by declare my consent agreement for fetching my information via AITAN Labs API",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
