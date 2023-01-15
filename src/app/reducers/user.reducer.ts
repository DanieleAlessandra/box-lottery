import {UserStore} from '../models/user-store.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const initialState: UserStore = {
  balance: 0
}

export function userReducer(state: UserStore = initialState, action: any) {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload};
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
