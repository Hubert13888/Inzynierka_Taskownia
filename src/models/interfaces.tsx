interface Action {
  type: string;
  payload?: any;
}
interface UserData {
  logged: string;
  token?: string;
  username?: string;
  email?: string;
}
export { Action, UserData };
