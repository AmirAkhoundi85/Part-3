import axios from "axios";
const baseUrl =process.env.REACT_APP_BASE_URL;
// const baseUrl = "http://localhost:3001";


const getAll = () => {
  const request = axios.get(baseUrl + "/api/persons/");
  return request.then((response) => response.data);
};
const create = (newPerson) => {
  const request = axios.post(baseUrl + "/api/persons/", newPerson);
  return request.then((response) => response.data);
};
const remove = (id) => {
  const request = axios.delete(baseUrl + "/api/persons/" + id);
  return request.then((response) => response.data);
};
const update = (id, newPerson) => {
  const request = axios.put(baseUrl + "/api/persons/" + id, newPerson);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
