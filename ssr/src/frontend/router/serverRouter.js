// import Home from '../containers/Home';
import Pruebas from '../containers/Pruebas';
import Catalogo from '../containers/Catalogo';
// import Play from '../containers/Play';
// import SignIn from '../containers/SignIn';
// import SignUp from '../containers/SignUp';
// import Styles from '../containers/Styles';
// import Notfound from '../containers/Notfound';

const routers = [
  // {
  //   exact: true,
  //   path: '/',
  //   component: Home,
  // },
  {
    exact: true,
    path: '/pruebas',
    component: Pruebas,
  },
  // {
  //   exact: true,
  //   path: '/styles',
  //   component: Styles,
  // },
  {
    exact: true,
    path: '/catalogo',
    component: Catalogo,
  },
  // {
  //   exact: true,
  //   path: '/play',
  //   component: Play,
  // },
  // {
  //   exact: true,
  //   path: '/sign-up',
  //   component: SignUp,
  // },
  // {
  //   exact: true,
  //   path: '/sign-in',
  //   component: SignIn,
  // },
  // {
  //   exact: false,
  //   component: Notfound,
  // },
];

export default routers;
