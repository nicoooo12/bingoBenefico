const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CARRITO':
      return {
        ...state,
        carrito: {
          ...state.carrito,
          data: state.carrito.data[0] ? [...state.carrito.data.map((e, o)=>{
            if (e.serie === action.payload.serie) {
              return { ...e, cantidad: state.carrito.data[o].cantidad + 1 };
            }
            return e;
          }), (state.carrito.data.filter((e)=>e.serie === action.payload.serie)[0] ? undefined : { ...action.payload, cantidad: 1 })].filter((e)=>e !== undefined) :
            [{ ...action.payload, cantidad: 1 }],
        },
      };
    case 'REMOVE_ITEM_TO_CARRITO':
      return {
        ...state,
        carrito: {
          ...state.carrito,
          data: state.carrito.data.map((e, o)=>{
            if (e.serie === action.payload.serie) {
              if (e.cantidad > 1) {
                return { ...e, cantidad: state.carrito.data[o].cantidad - 1 };
              }
              return undefined;
            }
            return e;
          }).filter((e)=>e !== undefined),
        },
      };
    case 'ACTIVE_CARRITO':
      return {
        ...state,
        carrito: { ...state.carrito, active: true },
      };
    case 'DESACTIVE_CARRITO':
      return {
        ...state,
        carrito: { ...state.carrito, active: false },
      };

    case 'STATUS_NEXT_CARRITO':
      return {
        ...state,
        carrito: { ...state.carrito, state: state.carrito.state + 1 },
      };

    case 'SET_STATUS_CARRITO':
      return {
        ...state,
        carrito: { ...state.carrito, state: action.payload },
      };

    default:
      return state;
  }
};

export default reducer;
