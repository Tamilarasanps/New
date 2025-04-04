import axios from "axios";

const useApi = () => {
  const API_URL = "http://192.168.1.5:5000";

  const handleRequest = async (request, path, token) => {


    try {
      const response = await request();
      return response;
    } catch (err) {
      const errorMessage = err.response ? err.response.data : err.message;
      console.log("Error:", errorMessage);
      throw err;
    }
  };

  const jsonHeader = (token) => ({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  const GETAPI = async (path, token) =>
    await handleRequest(
      () => axios.get(`${API_URL}/${path}`, { headers: jsonHeader(token) }),
      path,
      token
    );

  const POSTAPI = async (path, data, token) =>
    await handleRequest(
      () => axios.post(`${API_URL}/${path}`, data, { headers: jsonHeader(token) }),
      path,
      token
    );
  const PATCHAPI = async (path, data, token) =>
    await handleRequest(
      () => axios.patch(`${API_URL}/${path}`, data, { headers: jsonHeader(token) }),
      path,
      token
    );

  return {
    getJsonApi: (path, token) => GETAPI(path, token),
    postJsonApi: (path, data, token) => POSTAPI(path, data, token),
    pathchApi: (path, data, token) => PATCHAPI(path, data, token),
  };
};

export default useApi;
