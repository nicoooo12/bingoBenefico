import Home from '../containers/Home';
import Pruebas from '../containers/Pruebas';
import Catalogo from '../containers/Catalogo';
import Compra from '../containers/Compra';
import Cartones from '../containers/Cartones';
import Ordenes from '../containers/Ordenes';
import Play from '../containers/Play';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Ayuda from '../containers/Ayuda';
// import Styles from '../containers/Styles';
// import Notfound from '../containers/Notfound';

const routers = (isLogged)=>{
  return [
    {
      exact: true,
      path: '/',
      component: Home,
    },
    {
      exact: true,
      path: '/pruebas',
      component: Pruebas,
    },
    {
      exact: true,
      path: '/catalogo',
      component: Catalogo,
    },
    {
      exact: true,
      path: '/cartones',
      component: Cartones,
    },
    {
      exact: true,
      path: '/compra',
      component: Compra,
    },
    {
      exact: true,
      path: '/ordenes',
      component: Ordenes,
    },
    {
      exact: true,
      path: '/play',
      component: Play,
    },
    {
      exact: true,
      path: '/sign-up',
      component: SignUp,
    },
    {
      exact: true,
      path: '/sign-in',
      component: SignIn,
    },
    {
      exact: true,
      path: '/help',
      component: Ayuda,
    },
  // {
  //   exact: false,
  //   component: Notfound,
  // },
  ];
};

export default routers;
