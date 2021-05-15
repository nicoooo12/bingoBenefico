import React from 'react';
import Icon from '../display/Icon';
import '../../assets/styles/components/forms/Input.scss';
const App = ({ type, placeholder, name, text = '', onChange, autoComplete = 'true' })=> {

  const Input = React.createRef(Input);

  const delHandler = ()=> {
    Input.current.value = '';
  };

  return (
    <div className='input'>
      <input autoComplete={autoComplete} type={type} name={name} onChange={onChange} id={placeholder} placeholder={placeholder} ref={Input}/>
      <div>
        <button onClick={delHandler} type='button' tabIndex='-1'>
          <Icon type='close' />
        </button>
      </div>
      <label htmlFor={placeholder} >{placeholder}</label>
      <p>{text}</p>
    </div>
  );

};

export default App;
