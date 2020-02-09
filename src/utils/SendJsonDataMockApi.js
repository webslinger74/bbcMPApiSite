import Axios from 'axios';

const sendJsonDataMockApi = (indData) => {
    const urlPOST = "/api/member";
      console.log(indData, "the individual data in function");
      const dt = { data: { value: indData }};
      Axios.post(urlPOST, dt).then((data) => {
          console.log(data, "the failed mock api return")
      }
      ).catch((err) =>  {
        console.log(err, "the server is not available");
      })
  }

export default sendJsonDataMockApi;