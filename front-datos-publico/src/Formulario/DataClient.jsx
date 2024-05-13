import axios from "axios";

export async function DataCliente(ci) {
  const URL = `api/v2/data?cedula=${ci}&access_token=${process.env.REACT_APP_API_KEY}`;
  return axios.get(URL);
}
