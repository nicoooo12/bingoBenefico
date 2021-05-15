import React from 'react';
import ButtonIcon from './ButtonIcon';
import Button from './Button';
import '../../assets/styles/components/forms/Pageination.scss';
const App = ({ content = [], pag, btn = false, nextHandler, text = 'Finalizar', end, disabled = false })=> {

  const handler = (e)=> {
    if (e.target.id === '0' || +e.target.id) {
      nextHandler(+e.target.id);
    } else {
      nextHandler(undefined);
    }
  };

  return (
    <div className='pagination'>
      <div className='items'>
        {
          content.map((e, index)=>{
            return (<div key={index} id={index} className={`pag${index === pag ? '-active' : ''}`} onClick={handler} > </div>);
          })
        }
      </div>
      {
        btn &&
        (+content.length !== +pag + 1) ?
          <div style={{ transform: 'rotate(-180deg)' }}>
            <ButtonIcon onClick={handler} disabled={disabled} />
          </div> :
          <div>
            <Button size='small' onClick={end} disabled={disabled} >{text}</Button>
          </div>
      }
    </div>
  );

};

export default App;
