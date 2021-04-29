import React from 'react';

import '../assets/styles/components/Title.scss';

const App = (props)=> {
  const { title, children } = props;
  return (
    <div className='title'>
      <h1 className='title__h1'>
        { title }
      </h1>
      {children}
    </div>
  );

};

export default App;
