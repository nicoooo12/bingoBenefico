import React, { useState } from 'react';
import '../../assets/styles/components/forms/Button.scss';

const App = ({ children, size, type = 'button', typebutton, state = '', onClick, disabled = false })=> {

  const [login, setLogin] = useState(state);

  const onClickHandle = ()=>{
    setLogin('loading');
    onClick();
  };

  return (
    <button
      onClick={onClickHandle}
      className='button'
      type={type}
      disabled={disabled}
      typebutton={typebutton ? typebutton : 'primary'}
      sizebutton={size ? size : 'large'}
    >
      {
        login === 'loading' ? <div className='loading-spinner' /> : children
      }
    </button>
  );

};

export default App;
