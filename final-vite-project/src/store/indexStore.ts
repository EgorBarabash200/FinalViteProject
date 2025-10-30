import { makeAutoObservable, runInAction } from 'mobx';
import { postAuthorization, postRegistration, checkLogin } from '../API/ShopServis';
import { notification } from 'antd';

export interface User {
  login: string;
}

export interface RegistrationData {
  login: string;
  password: string;
  email: string;
  phone: string;
}

export interface LoginData {
  login: string;
  password: string;
}

class AuthStore {
  user: User | null = null;
  isLogModalOpen = false;
  isRegistModalOpen = false;
  loginForm = { login: '', password: '' };
  registrationForm = { login: '', password: '', email: '', phone: '' };
  repeatPassword = '';
  
  isLoading = false;
  stateCheckLogin = false;
  emailError = '';

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromStorage();
  }
  loadUserFromStorage() {
    const dataUserLS = localStorage.getItem("userInfo");
    if (dataUserLS) {
      try {
        this.user = JSON.parse(dataUserLS);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }
  openLoginModal = () => {
    this.isLogModalOpen = true;
    this.isRegistModalOpen = false;
  }

  openRegistModal = () => {
    this.isLogModalOpen = false;
    this.isRegistModalOpen = true;
  }

  closeModals = () => {
    this.isLogModalOpen = false;
    this.isRegistModalOpen = false;
    this.resetForms();
  }
  setUser = (user: User | null) => {
    this.user = user;
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo");
    }
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
        runInAction(() => {
          this.stateCheckLogin = res.result;
        });
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
      if (!email.includes('@yandex.ru') && !email.includes('@mail.com')) {
        this.emailError = 'Email должен содержать @yandex.ru или @mail.com';
        return;
      }
      if (email.includes('@yandex.ru') && !email.endsWith('@yandex.ru')) {
        this.emailError = 'Email должен оканчиваться на @yandex.ru';
        return;
      }
      if (email.includes('@mail.com') && !email.endsWith('@mail.com')) {
        this.emailError = 'Email должен оканчиваться на @mail.com';
        return;
      }
      this.emailError = '';
    }
  }

  login = async () => {
  this.isLoading = true;
  try {
    const res = await postAuthorization(this.loginForm);
    
    runInAction(() => {
      if (res && typeof res === 'object' && 'login' in res) {
        this.setUser(res as User); 
        notification.success({
          message: 'Авторизация успешна!',
          description: 'Производим вход в аккаунт',
          placement: 'top',
          duration: 4,
        });
        this.resetForms();
        setTimeout(() => {
          this.closeModals();
        }, 2000);
      } else {
        console.warn('Invalid response from postAuthorization:', res);
        notification.error({
          message: 'Ошибка данных',
          description: 'Получены некорректные данные пользователя',
          placement: 'top',
          duration: 4,
        });
      }
    });
  } catch (error) {
    runInAction(() => {
      notification.error({
        message: 'Ошибка авторизации',
        description: 'Неверный логин или пароль',
        placement: 'top',
        duration: 4,
      });
      console.error('Ошибка авторизации:', error);
    });
  } finally {
    runInAction(() => {
      this.isLoading = false;
    });
  }
}
  register = async () => {
    this.isLoading = true;
    try {
      await postRegistration(this.registrationForm);
      notification.success({
        message: 'Регистрация успешна!',
        description: 'Теперь вы можете войти в свой аккаунт',
        placement: 'top',
        duration: 4,
      });
      
      runInAction(() => {
        this.resetForms();
        setTimeout(() => {
          this.closeModals();
          this.openLoginModal();
        }, 2000);
      });
    } catch (error) {
      notification.error({
        message: 'Ошибка регистрации',
        description: 'Не удалось зарегистрироваться. Попробуйте еще раз.',
        placement: 'top',
        duration: 4,
      });
      console.error('Ошибка регистрации:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
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