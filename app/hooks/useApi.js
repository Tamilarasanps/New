import axios from "axios";
const useApi = () => {

    const API_URL = 'http://192.168.1.5:5000';
  const handleRequest = async (request) => {
    console.log("reached")
    try {
      const response = await request();
      return response.data;
    } catch (err) {
      const errorMessage = err.response ? err.response.data : err.message;
      console.log(errorMessage);
      throw err;
    } 
  };
  const jsonHeader = { 'Content-Type': 'application/json' }
  
  const GETAPI = async (path, header) =>
    await handleRequest(() =>
      axios.get(`${API_URL}/${path}`, { headers: header })
    );


  const getJsonApi = async (path) => await GETAPI(path, jsonHeader);

  return {
    getJsonApi,
  };
};

export default useApi;
