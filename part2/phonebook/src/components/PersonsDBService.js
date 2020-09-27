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
