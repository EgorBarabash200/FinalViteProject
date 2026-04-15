import type { IValidFormLogin } from "./interface/interface";

export const isLoginFormValid = ({ login, password }: IValidFormLogin) => {
  return (
    login.length >= 6 &&
    login.length <= 15 &&
    password.length >= 6 &&
    password.length <= 15
  );
};
