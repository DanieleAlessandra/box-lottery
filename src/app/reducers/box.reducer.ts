import {Box} from '../models/box.model';

export const LOADED = 'LOADED';

export function boxReducer(state: Box[] = [], action: any) {
  if (action.type === LOADED) {
    return [...state, ...action.payload];
  }
  return state;
}
