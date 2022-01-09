import { Service } from './service';
import { Notification } from './notification';

export interface RootState {
  name: string;
  darkMode: boolean;
  lang: string;
  isAuth: boolean;
  searchBox: string;
  encryption: {
    raw: string;
    hash: string;
    salt: string;
  };
}

export interface ServiceState {
  // Record< Service name, Service content >
  list: Record<string, Service>;
}

export interface NotificationState {
  list: Notification[];
}

export interface ConvertedStore {
  store: RootState;
  serviceStore: ServiceState;
}
