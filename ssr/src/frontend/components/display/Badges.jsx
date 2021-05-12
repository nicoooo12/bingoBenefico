import React from 'react';

import '../../assets/styles/components/display/Badges.scss';
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
