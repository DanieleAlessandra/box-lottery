import {MainStore} from '../models/main-store.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const initialState: MainStore = {
  user: undefined,
  balance: 0
}

export function mainReducer(state: MainStore = initialState, action: any) {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload};
    case LOGOUT:
      return {...state, user: undefined};
    default:
      return state;
  }
}
