import React, { useState } from 'react';

import Button from '../components/forms/Button';
import { Link } from 'react-router-dom';

import '../assets/styles/components/Carrusel.scss';

const App = ({ image })=> {

  const [posCarrusel, setPosCarrusel] = useState(0);
  const [active, setActive] = useState(false);
  const [leftCarrusel, setLeftCarrusel] = useState('0');
  const [title, setTitle] = useState(image[posCarrusel].title);
  const [sub, setSub] = useState(image[posCarrusel].sub);
  const [btn, setBtn] = useState(image[posCarrusel].btnText);
  const [redirect, setRedirect] = useState(image[posCarrusel].redirect);
  const handleNextCarrusel = () =>{
    if (!image[posCarrusel + 1]) {
      setPosCarrusel(0);
      setLeftCarrusel(leftCarrusel - document.querySelector(`#carruselItem-${image.length - 2 }`).offsetWidth);
      setTitle(image[posCarrusel].title);
      setSub(image[posCarrusel].sub);
      setBtn(image[posCarrusel].btnText);
      setRedirect(image[posCarrusel].redirect);
      setActive(false);
    } else if (posCarrusel === 0) {
      setPosCarrusel(1);
      setLeftCarrusel(-((document.querySelector('#carruselItem-0').offsetWidth / 2) - (document.querySelector('.carrusel__img').offsetWidth / 2)));
      setTitle(image[posCarrusel].title);
      setSub(image[posCarrusel].sub);
      setBtn(image[posCarrusel].btnText);
      setRedirect(image[posCarrusel].redirect);
      setActive(false);
    } else {
      setPosCarrusel(posCarrusel + 1);
      setLeftCarrusel(leftCarrusel - document.querySelector(`#carruselItem-${posCarrusel + 1 }`).offsetWidth);
      setTitle(image[posCarrusel].title);
      setSub(image[posCarrusel].sub);
      setBtn(image[posCarrusel].btnText);
      setRedirect(image[posCarrusel].redirect);
      setActive(false);
    }
  };

  if (!active) {
    setActive(true);
    setTimeout(handleNextCarrusel, 4000);
  }

  return (
    <>
      <div className='carrusel' >
        <div className='carrusel__img'>
          <div style={{ left: `${leftCarrusel}px` }}>
            {
              image.map((e, index)=>{
                return (
                  <div key={index} className='carrusel__Img-item' id={`carruselItem-${index}`}>
                    <img src={e.img} />
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className='carrusel__foot'>
          <h1>{ title}</h1>
          <div>
            <p>{ sub }</p>
            <Link to={redirect}>
              <Button size='small'>{ btn }</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

};

export default App;
