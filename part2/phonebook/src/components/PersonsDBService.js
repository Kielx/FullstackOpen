import axios from "axios";

const baseUrl =
  "https://fullstackopen-phonebook-api.herokuapp.com/api/persons" ||
  "http://localhost:3001/api/persons";

const create = (
  newObject,
  persons,
  setPersons,
  setSuccessMessage,
  personObject
) => {
  const request = axios.post(baseUrl, newObject);
  request
    .then((response) => response.data)
    .then(function (response) {
      setPersons(persons.concat(response));
      setSuccessMessage(
        `${personObject.name} with phone number ${personObject.phone} was successfully created`
      );
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const delPerson = (id, persons, setPersons, setErrorMessage) => {
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
        setErrorMessage(`${personName} does not exist!`);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);

        db = axios.get(`${baseUrl}`);
        db.then((res) => {
          setPersons(res.data);
        });
      });
  }
};

const patchPersonNumber = (
  persons,
  setPersons,
  setSuccessMessage,
  newPhoneNumber,
  existingPerson,
  newName
) => {
  let res = axios.patch(`http://localhost:3001/persons/${existingPerson.id}`, {
    phone: newPhoneNumber,
  });
  res.then((res) => {
    let index = persons.indexOf(existingPerson);
    let temp = [...persons];
    temp[index] = res.data;
    setPersons(temp);

    setSuccessMessage(
      `${newName} phone number was updated to ${newPhoneNumber} successfully!`
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  });
};

export default { create, delPerson, patchPersonNumber };
