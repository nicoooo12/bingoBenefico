import React from 'react';

import '../../assets/styles/components/display/Card.scss';

const App = ({ children, width })=> {

  return (
    <div className='card'>
      { children }
    </div>
  );

};

export default App;
