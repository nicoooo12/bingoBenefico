import React from 'react';
import '../../assets/styles/components/forms/Button.scss';
const App = ({ children, size, type = 'button', typebutton, state, onClick })=> {

  return (
    <button
      onClick={onClick}
      className='button'
      type={type}
      typebutton={typebutton ? typebutton : 'primary'}
      sizebutton={size ? size : 'large'}
    >
      {
        state === 'loading' ? <div className='loading-spinner' /> : children
      }
    </button>
  );

};

export default App;
