import React from 'react';
import Icon from '../display/Icon';
import '../../assets/styles/components/forms/Accordion.scss';
const App = ({ title, children })=> {

  return (
    <details className='accordion' >
      <summary>
        <p>
          {title}
        </p>
        <div>
          <Icon type='close' />
        </div>
      </summary>
      <div>
        {children}
      </div>
    </details>
  );

};

export default App;
