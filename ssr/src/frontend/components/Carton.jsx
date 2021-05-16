import React from 'react';

import Badges from './display/Badges';

import '../assets/styles/components/Carton.scss';
const App = (props)=> {
  //titulo, data, serie
  return (
    <>
      <div className='carton'>
        <div className='carton__content'>
          <h1 className='carton__title'>
            {props.title}
          </h1>
          <div>
            <table className='carton__table'>
              <thead>
                <tr>
                  <th>B</th>
                  <th>I</th>
                  <th>N</th>
                  <th>G</th>
                  <th>O</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.data[0][0]}</td>
                  <td>{props.data[1][0]}</td>
                  <td>{props.data[2][0]}</td>
                  <td>{props.data[3][0]}</td>
                  <td>{props.data[4][0]}</td>
                </tr>
                <tr>
                  <td>{props.data[0][1]}</td>
                  <td>{props.data[1][1]}</td>
                  <td>{props.data[2][1]}</td>
                  <td>{props.data[3][1]}</td>
                  <td>{props.data[4][1]}</td>
                </tr>
                <tr>
                  <td>{props.data[0][2]}</td>
                  <td>{props.data[1][2]}</td>
                  <td>X</td>
                  <td>{props.data[2][2]}</td>
                  <td>{props.data[3][2]}</td>
                </tr>
                <tr>
                  <td>{props.data[0][3]}</td>
                  <td>{props.data[1][3]}</td>
                  <td>{props.data[2][3]}</td>
                  <td>{props.data[3][3]}</td>
                  <td>{props.data[4][3]}</td>
                </tr>
                <tr>
                  <td>{props.data[0][4]}</td>
                  <td>{props.data[1][4]}</td>
                  <td>{props.data[2][4]}</td>
                  <td>{props.data[3][4]}</td>
                  <td>{props.data[4][4]}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='carton__foot'>
            {/* <button className='carton__buttonPrint'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-printer-fill' viewBox='0 0 16 16'>
                <path d='M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z'/>
                <path d='M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z'/>
              </svg>
              Imprimir
            </button> */}
            <Badges>
              serie: {props.serie}
            </Badges>
          </div>
        </div>
      </div>
    </>
  );

};

export default App;
