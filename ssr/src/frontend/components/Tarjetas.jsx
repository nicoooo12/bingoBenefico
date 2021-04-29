import React from 'react';
import Button from './ButtonGroup';
import Badges from './Badges';

import '../assets/styles/components/Tarjetas.scss';
const App = ({ title, subTitle, precio, serie, premios })=> {

  return (
    <div className='tarjeta'>
      <div className='tarjeta__content'>
        <h1 className='tarjeta__title'>{title}</h1>
        <div className='tarjeta__premios'>
          <small>
            { premios }
          </small>
        </div>
        <p className='tarjeta__subTitle'>{subTitle}</p>
        <div className='tarjeta__componentsGroup'>
          <Button title={title} precio={precio} serie={serie} />
          <Badges>{'$' + precio + ' CLP'}</Badges>
        </div>
      </div>
    </div>
  );

};

export default App;
