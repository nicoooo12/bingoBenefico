import React from 'react';

import '../assets/styles/components/Section.scss';
const App = ({ children })=> {

  return (
    <section className='section'>
      { children }
    </section>
  );

};

export default App;
