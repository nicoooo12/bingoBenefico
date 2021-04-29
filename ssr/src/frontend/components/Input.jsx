import React from 'react';
import '../assets/styles/App.scss';
const App = ({ type, placeholder, name })=> {

  return (
    <div className='input-text'>
      <input type={type} name={name} id={placeholder} placeholder={placeholder}/>
      <label htmlFor={placeholder} >{placeholder}</label>
    </div>
  );

};

export default App;
