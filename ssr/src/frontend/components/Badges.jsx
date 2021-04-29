import React from 'react';

import '../assets/styles/components/Badges.scss';
const App = ({ children })=> {

  return (
    <div className='badges'>
      <span>
        { children }
      </span>
    </div>
  );

};

export default App;
