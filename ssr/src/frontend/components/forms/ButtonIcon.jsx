import React from 'react';
import Icon from '../display/Icon';
import '../../assets/styles/components/forms/ButtonIcon.scss';
const App = ({ size, type, typebutton, state, onClick })=> {

  return (
    <button
      onClick={onClick}
      className='buttonIcon'
      type={type ? type : 'button'}
      typebutton={typebutton ? typebutton : 'primary'}
      sizebutton={size ? size : 'large'}
    >
      {
        state === 'loading' ? <div className='loading-spinner' /> : <Icon type='forward' height='24' width='24'/>
      }
    </button>
  );

};

export default App;
