import React from 'react';
import Icon from '../display/Icon';
import '../../assets/styles/components/forms/Input.scss';
const App = ({ type, placeholder, name, text = '' })=> {

  const Input = React.createRef(Input);

  const delHandler = ()=> {
    Input.current.value = '';
  };

  return (
    <div className='input'>
      <input type={type} name={name} id={placeholder} placeholder={placeholder} ref={Input}/>
      <div>
        <button onClick={delHandler}>
          <Icon type='close' />
        </button>
      </div>
      <label htmlFor={placeholder} >{placeholder}</label>
      <p>{text}</p>
    </div>
  );

};

export default App;
