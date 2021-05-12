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
      .catch((error) => dispatch(setError(error)));
  };
};

export const singIn = (payload, fnCallBack) => {
  return (dispatch) => {
    axios.post('/auth/sign-in', payload)// {email, password}
      .then(({ data }) => {
        dispatch(registerRequest(data));
      })
      .then(() => {
        fnCallBack();
      })
      .catch((error) => dispatch(setError(error)));
  };
};
