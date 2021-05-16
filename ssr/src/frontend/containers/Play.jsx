import React, { useState } from 'react';
import { connect } from 'react-redux';

import HeaderB from '../components/Header-B';
import Header from '../components/Header';
import Button from '../components/forms/Button';
// import Footer from '../components/Footer';
// import MainContent from '../components/MainContent';
// import Section from '../components/Section';
// import Title from '../components/Title';
// import Jugar from '../components/Jugar';
// import Carton from '../components/Carton';
// import '../assets/styles/App.scss';
// import { changeColorPlay } from '../actions';

import '../assets/styles/containers/Play.scss';
import '../assets/styles/components/Carton.scss';
import { Link } from 'react-router-dom';

const App = ({ play, misCartones, catalogos }) => {

  // const props = { data: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 'X', 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0]] };
  const [pint, setPint] = useState([
    ...misCartones.map((e)=>{
      return e.play;
    }),
  ]);

  // console.log(misCartones);
  // console.log(pint[0][0] ? color2 : 'transparent');
  // console.log(pint[0][1] ? color2 : 'transparent');

  const color1 = '#5F2EEA';
  const color2 = '#5F2EEA';

  const serie = 2;

  const key = 0;

  const changeHandler = (r, o, item)=>{
    if (pint[item][r][o]) {
      setPint(
        pint.map((q, indexA)=>{
          return q.map((g, indexB)=>{
            if (indexA === item) {
              return g.map((n, indexC)=>{
                if (indexB === r) {
                  return indexC === o ? false : n;
                }
                return n;
              });
            }
            return g;
          });
        }),
      );
    } else {
      setPint(
        pint.map((q, indexA)=>{
          return q.map((g, indexB)=>{
            if (indexA === item) {
              return g.map((n, indexC)=>{
                if (indexB === r) {
                  return indexC === o ? true : n;
                }
                return n;
              });
            }
            return g;
          });
        }));
    }

  };

  switch (key) {
    case 0:
      return (
        <div className='play' >
          <Header to='/' title='A jugar!'>
            <h1>Aun<br/>no iniciamos...</h1>
            <p>Ya tienes tu carton?</p>
            <Link to='catalogo'>
              <Button>Ir a comprar</Button>
            </Link>
          </Header>
        </div>
      );
    case 1:
      return (
        <div className='play' >
          <Header to='/' title='Sala de espera'>
            <h1>Estamos preparando todo.</h1>
            <p>Espera una poco ;)</p>
          </Header>
        </div>
      );
    case 2:
      if (!misCartones[0] || !misCartones.filter((e)=>{return e.serie === serie;})[0]) {
        return (<div className='play' >
          <Header to='/' title='Sala de espera'>
            <h1>No tienes cartones para este juego.</h1>
            <p>Espera una poco ;)</p>
          </Header>
        </div>);
      }
      return (
        <div className='play' >
          <HeaderB to='/' />
          <div className='carton'>
            <div className='carton__content'>
              <h1 className='carton__title'>
                {catalogos.filter((e)=>{
                  // console.log(e.serie === serie);
                  return e.serie === serie;
                })[0].titulo}
              </h1>
              <div className='hidden-data'>
                <div className='data'>
                  {
                    misCartones.map((e, index)=>{
                      return (
                        <div className='item' key={index} id={e.serie}>
                          <table className='carton__table'>
                            <thead>
                              <tr>
                                <th style={{ background: color1 }}>B</th>
                                <th style={{ background: color1 }}>I</th>
                                <th style={{ background: color1 }}>N</th>
                                <th style={{ background: color1 }}>G</th>
                                <th style={{ background: color1 }}>O</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][0][0] ? color2 : 'transparent'}`,
                                      color: `${pint[index][0][0] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(0, 0, index);}
                                  }
                                >{e.data[0][0]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][1][0] ? color2 : 'transparent'}`,
                                      color: `${pint[index][1][0] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(1, 0, index);}
                                  }
                                >{e.data[1][0]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][2][0] ? color2 : 'transparent'}`,
                                      color: `${pint[index][2][0] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(2, 0, index);}
                                  }
                                >{e.data[2][0]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][3][0] ? color2 : 'transparent'}`,
                                      color: `${pint[index][3][0] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(3, 0, index);}
                                  }
                                >{e.data[3][0]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][4][0] ? color2 : 'transparent'}`,
                                      color: `${pint[index][4][0] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(4, 0, index);}
                                  }
                                >{e.data[4][0]}</td>
                              </tr>
                              <tr>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][0][1] ? color2 : 'transparent'}`,
                                      color: `${pint[index][0][1] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(0, 1, index);}
                                  }
                                >{e.data[0][1]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][1][1] ? color2 : 'transparent'}`,
                                      color: `${pint[index][1][1] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(1, 1, index);}
                                  }
                                >{e.data[1][1]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][2][1] ? color2 : 'transparent'}`,
                                      color: `${pint[index][2][1] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(2, 1, index);}
                                  }
                                >{e.data[2][1]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][3][1] ? color2 : 'transparent'}`,
                                      color: `${pint[index][3][1] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(3, 1, index);}
                                  }
                                >{e.data[3][1]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][4][1] ? color2 : 'transparent'}`,
                                      color: `${pint[index][4][1] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(4, 1, index);}
                                  }
                                >{e.data[4][1]}</td>
                              </tr>
                              <tr>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][0][2] ? color2 : 'transparent'}`,
                                      color: `${pint[index][0][2] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(0, 2, index);}
                                  }
                                >{e.data[0][2]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][1][2] ? color2 : 'transparent'}`,
                                      color: `${pint[index][1][2] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(1, 2, index);}
                                  }
                                >{e.data[1][2]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][2][2] ? color2 : 'transparent'}`,
                                      color: `${pint[index][2][2] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(2, 2, index);}
                                  }
                                >{e.data[2][2]}{/*X*/}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][3][2] ? color2 : 'transparent'}`,
                                      color: `${pint[index][3][2] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(3, 2, index);}
                                  }
                                >{e.data[3][2]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][4][2] ? color2 : 'transparent'}`,
                                      color: `${pint[index][4][2] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(4, 2, index);}
                                  }
                                >{e.data[4][2]}</td>
                              </tr>
                              <tr>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][0][3] ? color2 : 'transparent'}`,
                                      color: `${pint[index][0][3] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(0, 3, index);}
                                  }
                                >{e.data[0][3]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][1][3] ? color2 : 'transparent'}`,
                                      color: `${pint[index][1][3] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(1, 3, index);}
                                  }
                                >{e.data[1][3]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][2][3] ? color2 : 'transparent'}`,
                                      color: `${pint[index][2][3] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(2, 3, index);}
                                  }
                                >{e.data[2][3]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][3][3] ? color2 : 'transparent'}`,
                                      color: `${pint[index][3][3] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(3, 3, index);}
                                  }
                                >{e.data[3][3]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][4][3] ? color2 : 'transparent'}`,
                                      color: `${pint[index][4][3] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(4, 3, index);}
                                  }
                                >{e.data[4][3]}</td>
                              </tr>
                              <tr>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][0][4] ? color2 : 'transparent'}`,
                                      color: `${pint[index][0][4] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(0, 4, index);}
                                  }
                                >{e.data[0][4]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][1][4] ? color2 : 'transparent'}`,
                                      color: `${pint[index][1][4] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(1, 4, index);}
                                  }
                                >{e.data[1][4]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][2][4] ? color2 : 'transparent'}`,
                                      color: `${pint[index][2][4] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(2, 4, index);}
                                  }
                                >{e.data[2][4]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][3][4] ? color2 : 'transparent'}`,
                                      color: `${pint[index][3][4] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(3, 4, index);}
                                  }
                                >{e.data[3][4]}</td>
                                <td
                                  style={
                                    {
                                      background: `${pint[index][4][4] ? color2 : 'transparent'}`,
                                      color: `${pint[index][4][4] ? '#FCFCFC' : '#14142B'}`,
                                    }
                                  }
                                  onClick={
                                    ()=>{changeHandler(4, 4, index);}
                                  }
                                >{e.data[4][4]}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>);
                    }).filter((e)=>{
                      // console.log(e);
                      return e.props.id === serie;
                    }).map((e)=>{
                      return e;
                    })
                  }
                </div>
              </div>
              <div className='foot'>

                <Button size='medium'>Bingo!</Button>
              </div>
            </div>
          </div>
        </div>
      );
  }

};

const mapStateToProps = (state)=>{
  return {
    misCartones: state.cartonesUser,
    catalogos: state.catalogos,
    play: state.play,
  };
};

const mapDispatchToProps = {
  // changeColorPlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
