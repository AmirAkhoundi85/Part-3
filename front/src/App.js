import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./servises/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getName = (e) => {
    setNewName(e.target.value);
  };

  const getNumber = (e) => {
    setPhone(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();

    const person = persons.find((item) => item.name === newName);
    const newPerson = { name: newName, number: number };

    if (!person) {
      personService
        .create(newPerson)
        .then((data) => {
          setPersons([...persons, data]);
          setError("");
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log(error.response.data.error);
        });
    } else {
      const result = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (result) {
        personService
          .update(person.id, newPerson)
          .then((data) => {
            const newPersons = persons.map((item) =>
              item.id != data.id ? item : data
            );
            setPersons(newPersons);
          })
          .catch((error) => {
            setMessage("");
            setError(
              `Information of ${newName} has already been remmoved from server.`
            );
            setTimeout(() => {
              setError("");
            }, 5000);
          });
      }
    }

    setNewName("");
    setPhone("");
  };

  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removePerson = (id, name) => {
    // const person= persons.find((item)=>item.id== id)// item2
    const result = window.confirm(`Delete ${name} ?`);
    if (result) {
      personService.remove(id).then((data) => {
        const newPersons = persons.filter((item) => item.id !== id); //[ item1, item3, item4]
        setPersons(newPersons);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <h3 className="success">{message}</h3>}
      {error && <h3 className="error">{error}</h3>}
      <Filter searchTerm={searchTerm} handelSearch={handelSearch} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        getName={getName}
        number={number}
        getNumber={getNumber}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  );
}

export default App;
