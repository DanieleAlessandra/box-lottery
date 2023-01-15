import {Wallet} from './wallet.model';

export interface User {
  id: string;
  name: string;
  wallets: Wallet[];
}
