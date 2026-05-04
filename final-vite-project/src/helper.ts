import type { IValidFormLogin, User  } from "./interface/interface";

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
  form: User,
  loginError: boolean,
  emailError: string,
  passwordsMatch: boolean
) => {
  console.log('isRegistrationFormValid')
  const password = form.password ? form.password : '';
  const email = form.email ? form.email : '';
  const phone = form.phone ? form.phone : '';

  return (
    isLoginValid(form.login) &&
    !loginError &&
    isPasswordValid(password) &&
    passwordsMatch &&
    email.length > 0 &&
    !emailError &&
    isPhoneValid(phone)
  );
};