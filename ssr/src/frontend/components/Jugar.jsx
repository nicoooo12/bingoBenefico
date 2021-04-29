import React from 'react';
import Content from '../components/Content';

import Time from '../components/Time';
// import '../assets/styles/components/MainContent.scss';
const App = ()=> {

  const finalMessage = (<div>
    <button>Jugar</button>
  </div>);

  return (
    <Content>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus fugit eos, ducimus eveniet veritatis sunt fugiat et sint quisquam, amet qui, quis omnis architecto beatae rem veniam. Modi, id accusantium.</p>
      <h1>
        Iniciamos en: <Time finalMessage={finalMessage}/>
      </h1>
    </Content>
  );

};

export default App;
