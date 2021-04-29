import React from 'react';

import '../assets/styles/components/MainContent.scss';
const App = ({ children })=> {

  return (
    <main className='main'>
      { children }
    </main>
  );

};

export default App;
