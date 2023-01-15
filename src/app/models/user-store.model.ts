import {User} from './user.model';

export interface UserStore {
  user?: User;
  balance: number;
}
