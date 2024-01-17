import React from "react";

const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <div>
      {filteredPersons.map((item, index) => (
        <p key={index}>
          {item.name} {item.number}
          <button onClick={() => removePerson(item.id, item.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
