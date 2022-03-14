import IUserModel from "./IUserModel";

export default interface IAuthContext {
  user: IUserModel | undefined;
  accessToken: string | undefined;
  login: (user: IUserModel, token: string) => void;
  logout: () => void;
}
