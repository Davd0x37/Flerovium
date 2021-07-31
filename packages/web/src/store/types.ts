export interface RootState {
  name: string;
  darkMode: boolean;
  lang: string;
  isAuthenticated: boolean;
  encryption: {
    passwordHash: string;
    salt: string;
  };
}
