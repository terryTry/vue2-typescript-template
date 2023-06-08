type RootState = {
  loading: boolean;
  user: UserState;
};

type UserState = {
  userName: string;
  token: string;
};
