
declare global {
  interface Window {
      // i18n: any;
      // eCharts: any;
  }
}

type RootState = {
  loading: boolean;
  user: UserState;
};

type UserState = {
  userName: string;
  token: string;
};
