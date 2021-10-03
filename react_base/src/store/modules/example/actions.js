import * as types from '../types';

export function clicaBotaoRequest() {
  return {
    type: types.BUTAO_REQUEST,
  };
}

export function clicaBotaoSuccess() {
  return {
    type: types.BUTAO_SUCCESS,
  };
}

export function clicaBotaoFailure() {
  return {
    type: types.BUTAO_FAILURE,
  };
}
