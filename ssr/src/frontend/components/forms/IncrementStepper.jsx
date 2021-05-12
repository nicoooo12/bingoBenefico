import React, { useState } from 'react';

import '../../assets/styles/components/forms/IncrementStepper.scss';
const App = ({ text = true, idHandler, handlerAdd, handlerSubtract, setStartCount = 0, disabledButton })=> {

  const [count, setCount] = useState(setStartCount);

  const addHandle = ()=>{
    setCount(count + 1);
    handlerAdd(idHandler, count + 1);
  };
  const removeHandle = ()=>{
    setCount(count - 1);
    handlerSubtract(idHandler, count - 1);
  };

  return (
    <div className='buttonGroup'>
      {
        text ?
          <>
            {
              count > 0 ?
                <>
                  <button disabled={!!disabledButton} className='buttonGroup__buttonAction' onClick={removeHandle}>-</button>
                  <span>{ count }</span>
                  <button disabled={!!disabledButton} className='buttonGroup__buttonAction' onClick={addHandle}>+</button>
                </> :
                <>
                  <button disabled={!!disabledButton} className='buttonGroup__buttonComprar' onClick={addHandle}>Añadir Al carrito</button>
                </>
            }
          </> :
          <>
            <button className='buttonGroup__buttonAction' onClick={removeHandle}>-</button>
            <span>{ count }</span>
            <button className='buttonGroup__buttonAction' onClick={addHandle}>+</button>
          </>
      }
    </div>
  );

};

export default App;
