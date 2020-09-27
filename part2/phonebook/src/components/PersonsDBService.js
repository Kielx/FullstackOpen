import axios from "axios";

const baseUrl = "/api/persons" || "http://localhost:3001/api/persons";

const create = async (
  newObject,
  persons,
  setPersons,
  displayMessage,
  personObject
) => {
  try {
    const res = await axios.post(baseUrl, newObject);
    setPersons(persons.concat(res.data));
    displayMessage(
      "success",
      `${personObject.name} with phone number ${personObject.phone} was successfully created`
    );
  } catch (e) {
    displayMessage("error", "Data provided is invalid");
  }
};

const delPerson = (id, persons, setPersons, displayMessage) => {
  let personName;
  let personPhone;
  Object.values(persons).forEach((person) => {
    if (person._id === id) {
      personName = person.name;
      personPhone = person.phone;
    }
  });
  if (window.confirm(`Do you really want to delete ${personName}?`)) {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((response, pr) => {
        if (response.status === 200 && response.statusText === "OK") {
          pr = persons.filter((person) => person._id !== id);
          setPersons(pr);
          displayMessage(
            "success",
            `${personName} with phone number ${personPhone} was successfully deleted!`
          );
        }
      })
      .catch((err, db) => {
        displayMessage("error", `Selected user does not exist!`);

        db = axios.get(`${baseUrl}`);
        db.then((res) => {
          setPersons(res.data);
        });
      });
  }
};

const patchPersonNumber = async (
  persons,
  setPersons,
  displayMessage,
  newPhoneNumber,
  existingPerson
) => {
  let res;
  try {
    res = await axios.patch(`${baseUrl}/${existingPerson._id}`, {
      phone: newPhoneNumber,
    });
    displayMessage(
      "success",
      `${existingPerson.name} phone number was successfully updated to ${newPhoneNumber}`
    );
    let temp = [...persons];
    temp.forEach((person) => {
      if (person._id === res.data._id) {
        person.phone = newPhoneNumber;
      }
    });
    setPersons(temp);
  } catch (e) {
    displayMessage(
      "error",
      "Error ocurred while trying to change person number"
    );
    let db = axios.get(`${baseUrl}`);
    db.then((res) => {
      setPersons(res.data);
    });
  }
};

export default { create, delPerson, patchPersonNumber };
