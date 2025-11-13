import { makeAutoObservable } from 'mobx';
import { postAuthorization, postRegistration, checkLogin } from '../API/ShopServis';
import { notification } from 'antd';
import type { LoginData, RegistrationData, User } from '../interface/interface';

class AuthStore {
  user: User | null = null;
  stateModal = {
    login: false,
    registr: false,
  }
  loginForm = { login: '', password: '' };
  registrationForm = { login: '', password: '', email: '', phone: '' };
  repeatPassword = '';
  stateLoad = {
    login: false,
    registr: false
  }
  stateCheckLogin = false;
  emailError = '';

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromStorage();
  }
  loadUserFromStorage() {
    const dataUserLS = localStorage.getItem("userInfo");
    if (dataUserLS) {
      this.user = JSON.parse(dataUserLS);
    }
  }
  openLoginModal = () => {
    this.stateModal.login = true;
    this.stateModal.registr = false;
  }

  openRegistModal = () => {
    this.stateModal.login = false;
    this.stateModal.registr = true;
  }

  closeModals = () => {
    this.stateModal.login = false;
    this.stateModal.registr = false;
    this.resetForms();
  }

  logout = () => {
    this.user = null;
    localStorage.removeItem("userInfo");
  }
  setLoginForm = (field: keyof LoginData, value: string) => {
    this.loginForm[field] = value;
  }
  setRegistrationForm = (field: keyof RegistrationData, value: string) => {
    this.registrationForm[field] = value;
  }

  setRepeatPassword = (value: string) => {
    this.repeatPassword = value;
  }
  get isLoginFormValid(): boolean {
    const { login, password } = this.loginForm;
    return login.length >= 6 && login.length <= 15 &&
      password.length >= 6 && password.length <= 15;
  }

  get isRegistrationFormValid(): boolean {
    const { login, password, email, phone } = this.registrationForm;
    const isLoginValid = login.length >= 6 && login.length <= 15 && !this.stateCheckLogin;
    const isPasswordValid = password.length >= 6 && password.length <= 15;
    const isPasswordMatch = password === this.repeatPassword;
    const isEmailValid = email.length > 0 && !this.emailError && email.length <= 20;
    const isPhoneValid = phone.length === 11;

    return isLoginValid && isPasswordValid && isPasswordMatch && isEmailValid && isPhoneValid;
  }

  get passwordsMatch(): boolean {
    return this.registrationForm.password === this.repeatPassword;
  }
  checkLoginAvailability = async (login: string) => {
    this.setRegistrationForm('login', login);

    if (login.length >= 6 && login.length <= 15) {
      try {
        const res = await checkLogin(login);
        this.stateCheckLogin = res.result;
      } catch (error) {
        console.error('Error checking login:', error);
      }
    }
  }
  validateEmail = (email: string) => {
    this.setRegistrationForm('email', email);

    if (email.length > 20) {
      this.emailError = 'Email не должен превышать 20 символов';
      return;
    }
    if (email.length > 0) {
      const emailRegex = /^[a-zA-Z0-9._-]+@(yandex\.ru|mail\.com)$/;

      if (!emailRegex.test(email)) {
        this.emailError = 'Email должен содержать @yandex.ru или @mail.com и оканчиваться на один из этих доменов';
        return;
      }

      this.emailError = '';
    } 
  }

login = async () => {
  this.stateLoad.login = true;
  try {
    const res = await postAuthorization(this.loginForm);
    if (res) {
      this.user = res;
      notification.success({
        message: 'Авторизация успешна!',
        description: 'Производим вход в аккаунт',
        placement: 'top',
        duration: 4,
      });
      this.resetForms();
      this.closeModals();;
    } else {
      throw new Error('Получены некорректные данные пользователя')
    }
  } catch (error) {
    notification.error({
      message: 'Ошибка авторизации',
      description: 'Неверный логин или пароль',
      placement: 'top',
      duration: 4,
    });
    console.error('Ошибка авторизации:', error);
  } finally {
    this.stateLoad.login = false;
  }
}
register = async () => {
  this.stateLoad.registr = true;
  try {
    await postRegistration(this.registrationForm);
    notification.success({
      message: 'Регистрация успешна!',
      description: 'Теперь вы можете войти в свой аккаунт',
      placement: 'top',
      duration: 4,
    });
    this.resetForms();
    this.openLoginModal();
  } catch (error) {
    notification.error({
      message: 'Ошибка регистрации',
      description: 'Не удалось зарегистрироваться. Попробуйте еще раз.',
      placement: 'top',
      duration: 4,
    });
    console.error('Ошибка регистрации:', error);
  } finally {
    this.stateLoad.registr = false;
  }
}
resetForms = () => {
  this.loginForm = { login: '', password: '' };
  this.registrationForm = { login: '', password: '', email: '', phone: '' };
  this.repeatPassword = '';
  this.stateCheckLogin = false;
  this.emailError = '';
}
}

export const authStore = new AuthStore();