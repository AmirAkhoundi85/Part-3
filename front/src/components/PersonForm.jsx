import React from 'react'

const PersonForm = ({newName, getName, number, getNumber, addName}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={getName} />
      </div>
      <div>
        number : <input value={number} onChange={getNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm