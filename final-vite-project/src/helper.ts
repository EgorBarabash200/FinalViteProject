import type { IValidFormLogin, IValidFormRegist  } from "./interface/interface";

export const isLoginFormValid = ({ login, password }: IValidFormLogin) => {
  return (
    login.length >= 6 &&
    login.length <= 15 &&
    password.length >= 6 &&
    password.length <= 15
  );
};

export const isLoginValid = (login: string) =>
  login.length >= 6 && login.length <= 15;

export const isPasswordValid = (password: string) =>
  password.length >= 6 && password.length <= 15;

export const isPhoneValid = (phone: string) => /^\d{11}$/.test(phone);

export const validateEmail = (email: string): string => {
  if (email.length > 20) {
    return 'Email не должен превышать 20 символов';
  }
  if (email.length > 0 && !/^[a-zA-Z0-9._-]+@(yandex\.ru|mail\.com)$/.test(email)) {
    return 'Email должен содержать @yandex.ru или @mail.com';
  }
  return '';
};

export const isRegistrationFormValid = (
  form: IValidFormRegist,
  loginTaken: boolean,
  emailError: string,
  passwordsMatch: boolean
) => {
  return (
    isLoginValid(form.login) &&
    !loginTaken &&
    isPasswordValid(form.password) &&
    passwordsMatch &&
    form.email.length > 0 &&
    !emailError &&
    isPhoneValid(form.phone)
  );
};