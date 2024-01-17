import React from 'react'

const Filter = ({ searchTerm, handelSearch }) => {
  return (
    <div>
      Filter shown with <input value={searchTerm} onChange={handelSearch} />
    </div>
  );
};

export default Filter