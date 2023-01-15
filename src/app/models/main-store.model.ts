import {User} from './user.model';

export interface MainStore {
  user?: User;
  balance: number;
}
