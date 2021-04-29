import React from 'react';

import '../assets/styles/components/Content.scss';

const App = ({ children })=> {

  return (
    <div className='content'>
      { children }
    </div>
  );

};

export default App;
