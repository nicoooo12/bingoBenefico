import React from 'react';

import Header from '../components/Header';
import Titulo from '../components/Title';
import ButtonIcon from '../components/forms/ButtonIcon';
import Accordion from '../components/forms/Accordion';

import '../assets/styles/containers/Ayuda.scss';

const App = ({ history })=> {

  const clickHandler = ()=>{
    document.querySelector('#react').scrollTo(0, document.querySelector('header').offsetHeight);
  };

  return (
    <>
      <Header title='Ayuda!' to='/' >
        <h1>Estamos aquí para ayudarte.</h1>
        <p>Tienes dudas con algo? No te preocupes, presiona sobre la pregunta que más se acomode a tus dudas. Si necesitas asistencia de otro tipo ve a la sección de contactos y contacta con el equipo organizador</p>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <ButtonIcon onClick={clickHandler} />
        </div>
      </Header>
      <div className='mainContent' style={{ top: '640px', position: 'absolute' }}>
        <Titulo title='Preguntas frecuentes' />
        <Accordion title='¿Qué es el Bingoloteando?' >
          El Bingoloteando es un evento iniciado por los Jóvenes por un Mundo Unido en beneficio del Centro Mariápolis Cunaco, que se realizará el domingo 21 de Febrero  a las 19.00 horas Chile vía Zoom y YouTube.
        </Accordion>
        <Accordion title='¿Cómo entro a la página?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Para poder acceder  a la página de Bingoloteando necesitas primero crearte una cuenta.
            </li>
            <li className='list-group-item'>
              Para esto solo tienes que apretar “Registrarme”, que te llevará a la página de registro.
            </li>
            <li className='list-group-item'>
              En esta página tendrás que poner tu Nombre, Apellido, Correo Electrónico y crear una Contraseña para tu cuenta.
            </li>
            <li className='list-group-item'>
              Cuando ya hayas ingresado todo eso, solo tienes que apretar el botón de “Entrar” y podrás acceder a la página.
            </li>
            <li className='list-group-item'>
              Ya registrad@, para acceder de nuevo a la página solo debes poner el correo electrónico y contraseña que usaste para registrarte y apretar el botón de “Entrar”.
            </li>
          </ul>
        </Accordion>
        <Accordion title='No se como hacer una cuenta' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Para crearte una cuenta, primero debes apretar en “Regístrate”  a la derecha del botón de “Entrar” en la página inicial o en el botón de “Registro” en la parte superior derecha en la página de Ayuda.
            </li>
            <li className='list-group-item'>
              Ya en la página de registro, necesitas poner en cada casilla la información necesaria. En orden son: Nombre, Apellido, Número de Teléfono,  Correo Electrónico, y crear una Contraseña que te parezca (puede ser lo que tu quieras, no hay restricciones.
            </li>
            <li className='list-group-item'>
              Cuando termines de ingresar todos esos datos, solo tienes que apretar el botón de “Entrar” ¡Y listo! No es necesario hacer ningún paso extra.
            </li>
            <li className='list-group-item'>
              ¿Por qué necesitas poner estos datos?
              <ul className='list-group'>
                <li className='list-group-item'>
                  Tu nombre y apellido se volverán el nombre de la cuenta y como se te identificará al momento de jugar.
                </li>
                <li className='list-group-item'>
                  Tu correo electrónico va a ser necesario para ingresar de nuevo a la página después de haberla cerrado. Esto es apretando “Iniciar sesión” en la esquina superior derecha de la página de ayuda  o la página inicial.
                </li>
                <li className='list-group-item'>
                  La contraseña se necesitará al momento de ingresar de nuevo a la página después de haberla cerrado. Esto es apretando “Iniciar sesión” en la esquina superior derecha de la página de ayuda  o la página inicial.
                </li>
              </ul>
            </li>
            <li className='list-group-item'>
              ¡Recuerda! Si ya te hiciste una cuenta una vez, no es necesario volver a hacer otra. Solo tienes que iniciar sesión con tu correo electrónico y la contraseña que creaste y apretar el botón de “Entrar”. Puedes encontrar la página apretando “Iniciar sesión” en la esquina superior derecha de la página de ayuda  o en la página de inicio.
            </li>
          </ul>
        </Accordion>
        <Accordion title='No me funciona mi cuenta' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Si no puedes acceder a tu cuenta,  asegura antes que nada que:
              <ul className='list-group'>
                <li className='list-group-item'>
                  Te hayas creado una cuenta en la página
                </li>
                <li className='list-group-item'>
                  Has puesto la contraseña y/o el correo electrónico con el cual te registraste correctamente.
                </li>
              </ul>
            </li>
            <li className='list-group-item'>
                Si no es ninguna de estas opciones, contáctate con nosotros con la información proporcionada en la página de “Contacto”.
            </li>
            <li className='list-group-item'>
              Esta la encontrarás en la parte inferior izquierda de la página.
            </li>
          </ul>
        </Accordion>
        <Accordion title='¿Cómo puedo ver el bingo?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              El Bingo solo se podrá jugar el domingo 21 de Febrero, partiendo de las 19.00 horas Chile, transmitido vía Zoom y Youtube.
            </li>
            <li className='list-group-item'>
                Es a través de estas plataformas en donde se podrá saber cuando se está jugando un bingo, que bingo se está jugando y qué números se están cantando.
            </li>
          </ul>
        </Accordion>
        <Accordion title='¿Cómo se compra un cartón?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Accede a la página registrándote o iniciando sesión
            </li>
            <li className='list-group-item'>
                Ya en la página principal, apreta el botón de “Comprar”.
Esto te llevará a la página de compras.

            </li>
            <li className='list-group-item'>
              En la página de compras estarán las opciones de cartones para cada bingo con los premios correspondientes.

            </li>
            <li className='list-group-item'>
              Para comprar un cartón, apreta el botón “Agregar al carrito”. Si deseas comprar más de un cartón aprieta el símbolo “+” hasta llegar al número deseado. Si quieres sacar un cartón del carrito, aprieta el símbolo “-”.

            </li>
            <li className='list-group-item'>
              En la parte superior de la pantalla aparecerá una franja azul que muestra el “Carrito de compras” con la cantidad de cartones que has comprado.

            </li>
            <li className='list-group-item'>
              Cuando hayas añadido todos los cartones que quieras jugar, presiona “¡Pagar todo!”. Esto te llevará a la página de “Selección de pago”, en donde podrás proceder a elegir la forma de pago y así poder pagar.

            </li>
            <li className='list-group-item'>
              Cuando hayas terminado de pagar podrás ver tus cartones apretando “Jugar” en el menú negro en la parte superior de la página o apretando tu nombre en la esquina superior derecha, y después  apretar “Mis cartones”.
            </li>
          </ul>
        </Accordion>
        <Accordion title='¿Cuantos cartones se pueden comprar?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              No hay límites de cuantos cartones puedes comprar.

            </li>
            <li className='list-group-item'>
                Para comprar un cartón, apreta el botón “Agregar al carrito”. Si deseas comprar más de un cartón aprieta el símbolo “+” hasta llegar al número deseado. Si quieres sacar un cartón del carrito, aprieta el símbolo “-”.

            </li>
            <li className='list-group-item'>
              En la parte superior de la pantalla aparecerá una franja azul que muestra el “Carrito de compras” con la cantidad de cartones que has comprado.

            </li>
            <li className='list-group-item'>
              Cuando hayas añadido todos los cartones que quieras jugar, presiona “¡Pagar todo!”. Esto te llevará a la página de “Selección de pago”, en donde podrás proceder a elegir la forma de pago y así poder pagar.

            </li>
          </ul>
        </Accordion>
        <Accordion title='¿Dónde puedo ver mi cartón?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Puedes ver tus cartones  de dos maneras:
              <ul className='list-group'>
                <li className='list-group-item'>
                  Apretando “Jugar” en el menú negro en la parte superior de la página
                </li>
              </ul>
              o
              <ul className='list-group'>
                <li className='list-group-item'>
                  Primero apretando tu nombre en la esquina superior derecha, que va a abrir un rectángulo blanco con tu nombre y con diferentes opciones, aquí debes apretar “Mis cartones”.
                </li>
              </ul>
            </li>
          </ul>
        </Accordion>
        <Accordion title='¿Cómo puedo jugar?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              El Bingo solo se podrá jugar el domingo 21 de Febrero, partiendo de las 19.00 horas Chile, transmitido vía Zoom y Youtube.
            </li>
            <li className='list-group-item'>
              Es a través de estas plataformas en donde se podrá saber cuando se está jugando un bingo, que bingo se está jugando y qué números se están cantando.
            </li>
            <li className='list-group-item'>
              Cuando sea la hora de jugar, uno tiene que estar en la página.

            </li>
            <li className='list-group-item'>
              Ya en la página, tiene que apretar “Jugar” en el menú negro en la parte superior de la página, que te llevará a la página de “¡A Jugar!”

            </li>
            <li className='list-group-item'>
              Aquí se mostrarán sus cartones y aparecerán dos botones. Para jugar, se aprieta el botón de “JUGAR”.

            </li>
            <li className='list-group-item'>
              Después de apretarlo, le llevará a una página en donde su(s) cartón(es) estarán visibles. Ahí es donde podrá jugar sus cartones.

            </li>
            <li className='list-group-item'>
              Si compró más de un cartón para un bingo podrá jugar con los dos cartones. Para cambiar de un cartón a otro debe presionar los diferentes números que te aparecerán  en la parte inferior izquierda del cartón visible.

            </li>
            <li className='list-group-item'>
              Para jugar tus cartones, solo debes presionar en los números de la forma en que desees. Y cuando creas que tienes todos los números, aprieta el botón amarillo que dice “BINGO!!”, en ese momento te aparecerá un mensaje que dice: “BINGO!! Estamos revisando tu cartón. Espera un momento.”

            </li>
            <li className='list-group-item'>
              Nadie podrá ver los números que vas apretando. Sin embargo, si aprietas el botón de “BINGO!!”, se transmitirá en la pantalla del Zoom y Youtube que tú estás diciendo “BINGO!!”.

            </li>
            <li className='list-group-item'>
              Cuando la partida se termine, volverás automáticamente a la página de “¡A Jugar!” a esperar por la próxima partida.

            </li>
          </ul>
        </Accordion>
        <Accordion title='No puedo estar el día, ¿Cómo puedo apoyar?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              En la página de inicio muestran tres otras maneras de apoyar al Centro Mariápolis:
              <ul className='list-group'>
                <li className='list-group-item'>
                  ¡Comprandoles un café! ¿Un café?, se preguntarán, ¡Tranquil@s, es solo una forma de decir! (No tienes que comprar café de verdad). Comprar un café significa donar la cantidad de dinero que usarías en una tienda común para comprar un café.
                </li>
                <li className='list-group-item'>
                  ¡Apoya donando dinero para la comida de los perros del Centro, Tobi y Toto!

                </li>
                <li className='list-group-item'>
                  ¡Apoya al Centro Mariápolis haciéndote socio y aportando mensualmente!

                </li>
              </ul>
            </li>
          </ul>
        </Accordion>
      </div>
    </>
  );
};

export default App;
