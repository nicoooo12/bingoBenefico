import React, { useState } from 'react';

import '../../assets/styles/components/forms/IncrementStepper.scss';
const App = (props)=> {

  const [count, setCount] = useState(0);

  const addHandle = ()=>{
    setCount(count + 1);
  };
  const removeHandle = ()=>{
    setCount(count - 1);
  };

  return (
    <div className='buttonGroup'>
      {
        count > 0 ?
          <>
            <button className='buttonGroup__buttonAction' onClick={removeHandle}>-</button>
            <span>{ count }</span>
            <button className='buttonGroup__buttonAction' onClick={addHandle}>+</button>
          </> :
          <>
            <button className='buttonGroup__buttonComprar' onClick={addHandle}>Añadir Al carrito</button>
          </>
      }
    </div>
  );

};

export default App;
