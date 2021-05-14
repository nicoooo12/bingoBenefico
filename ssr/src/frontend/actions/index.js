import axios from 'axios';

export const addItemToCarrito = (payload) =>({
  type: 'ADD_ITEM_TO_CARRITO',
  payload,
});

export const removeItemToCarrito = (payload) => ({
  type: 'REMOVE_ITEM_TO_CARRITO',
  payload,
});

export const activeCarrito = (payload) => ({
  type: 'ACTIVE_CARRITO',
  payload,
});

export const desactiveCarrito = (payload) => ({
  type: 'DESACTIVE_CARRITO',
  payload,
});

export const statusNextCarrito = (payload) => ({
  type: 'STATUS_NEXT_CARRITO',
  payload,
});

export const setStatusCarrito = (payload) => ({
  type: 'SET_STATUS_CARRITO',
  payload,
});

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const setRedirect = (payload) => ({
  type: 'SET_REDIRECT',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const createOrden = (payload, urlRedirect) => {
  return (dispatch) => {
    axios.post('/auth', payload)
      .then(({ data }) => {
        dispatch(registerRequest(data));
      })
      .then(() => {
        window.location.href = urlRedirect;
      });
  };
};

export const singUp = (payload, fnCallBack) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)// {email, name, password}
      .then(({ data }) => {
        dispatch(registerRequest(data));
      })
      .then(() => {
        fnCallBack();
      })
      .catch((error) => {
        console.log('[error:(]', error);
        dispatch(setError(error));
      });
  };
};

export const singIn = ({ email, password }, fnCallback, fnErrorCallback) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })// {email, password}
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(registerRequest(data.user));
      })
      .then(() => {
        fnCallback();
      })
      .catch((error) => {
        fnErrorCallback(error);
        // console.log(error.request.status);
        dispatch(setError(error));
      });
  };
};
