import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const delPerson = (id, persons, setPersons, setMessage) => {
  let personName;
  Object.values(persons).forEach((person) => {
    if (person.id === id) {
      personName = person.name;
    }
  });
  if (window.confirm(`Do you really want to delete ${personName}?`)) {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((response, pr) => {
        if (response.status === 200 && response.statusText === "OK") {
          pr = persons.filter((person) => person.id !== id);
          setPersons(pr);
        }
      })
      .catch((err, db) => {
        setMessage({
          message: `${personName} does not exist!`,
          className: "alert alert-danger",
        });
        setTimeout(() => {
          setMessage("");
        }, 5000);

        db = axios.get(`${baseUrl}`);
        db.then((res) => {
          setPersons(res.data);
        });
      });
  }
};
export default { create, delPerson };
