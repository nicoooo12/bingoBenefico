import React from 'react';

import '../assets/styles/components/MainContent.scss';
const App = ({ children })=> {

  return (
    <main className='main' id='main'>
      { children }
    </main>
  );

};

export default App;
