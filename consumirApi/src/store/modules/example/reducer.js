import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BUTAO_SUCCESS: {
      console.log('suck cesso');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }
    case types.BUTAO_FAILURE: {
      console.log('deu errozada');
      return state;
    }
    case types.BUTAO_REQUEST: {
      console.log('requisição...');
      return state;
    }
    default: {
      return state;
    }
  }
}
