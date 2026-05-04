import LogInput from "../ui/input/logInput/LogInput";
import "./formRegistration.scss";
import { observer } from "mobx-react-lite";
import { notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CustomBtn from "../ui/button/customBtn/CustomBtn";
import { useEffect, useState } from "react";
import { checkLogin, postRegistration } from "../../API/ShopServis";
import type { RegModalProps } from "../../interface/interface";
import { isRegistrationFormValid, validateEmail } from "../../helper";

const FormRegistration = observer(({ closeModal }: RegModalProps) => {
  const [registrationForm, setRegistrationForm] = useState({
    login: "",
    password: "",
    email: "",
    phone: "",
  });
  const [stateCheckLogin, setStateCheckLogin] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [stateLoad, setStateLoad] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [, contextHolder] = notification.useNotification();
  const [isDisabled, setIsDisabled] = useState(true);

  const registUser = async () => {
    try {
      await postRegistration(registrationForm);
      notification.success({
        message: "Регистрация успешна!",
        description: "Теперь вы можете войти в свой аккаунт",
        placement: "top",
        duration: 4,
      });
    } catch (e) {
      notification.error({
        message: "Ошибка регистрации",
        description: "Не удалось зарегистрироваться. Попробуйте еще раз.",
        placement: "top",
        duration: 4,
      });
      console.error("Ошибка регистрации:", e);
    } finally {
      setStateLoad(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/[^\d]/g, "");
    const truncated = onlyNumbers.slice(0, 11);
    setRegistrationForm({ ...registrationForm, phone: truncated });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9@.\-]/g, "");
    const resultValidate = validateEmail(filteredValue);
    setEmailError(resultValidate);
    setRegistrationForm({ ...registrationForm, email: value });
  };

  const checkLoginAvailability = async (textLogin: string) => {
    setRegistrationForm({ ...registrationForm, login: textLogin });

    if (textLogin.length >= 6 && textLogin.length <= 15) {
      try {
        const res = await checkLogin(textLogin);
        setStateCheckLogin(res.result);
      } catch (error) {
        console.error("Error checking login:", error);
      }
    }
    // Добавить уведомление о не соблюдении условия
  };

  const passwordsMatch = () => {
    return registrationForm.password === repeatPassword;
  };

  useEffect(() => {
    const errorMatchPassword = passwordsMatch();
    const isValid = !isRegistrationFormValid(
      registrationForm,
      stateCheckLogin,
      emailError,
      errorMatchPassword,
    );
    setIsDisabled(isValid);
  }, [registrationForm]);

  return (
    <div className="formRegistration">
      {contextHolder}
      <button className="close-button" onClick={closeModal}>
        <CloseOutlined />
      </button>
      <h2>Регистрация</h2>
      <div className="input-field">
        <LogInput
          placeholder="Логин"
          type="text"
          value={registrationForm.login}
          onChange={(e) => checkLoginAvailability(e.target.value)}
        />
        {registrationForm.login.length > 5 &&
          registrationForm.login.length <= 15 && (
            <div
              className={`validation-message ${stateCheckLogin ? "error" : "success"}`}
            >
              {stateCheckLogin ? "Логин занят" : "✓"}
            </div>
          )}
      </div>
      <div className="input-field">
        <LogInput
          placeholder="Пароль"
          type="password"
          value={registrationForm.password}
          onChange={(e) =>
            setRegistrationForm({
              ...registrationForm,
              password: e.target.value,
            })
          }
        />
        {registrationForm.password.length > 5 &&
          registrationForm.password.length <= 15 && (
            <div className="validation-message success">✓</div>
          )}
      </div>
      <div className="input-field">
        <LogInput
          placeholder="Повторите пароль"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {repeatPassword.length > 5 && repeatPassword.length <= 15 && (
          <div
            className={`validation-message ${passwordsMatch() ? "success" : "error"}`}
          >
            {passwordsMatch() ? "✓" : "Пароли не совпадают"}
          </div>
        )}
      </div>
      <div className="input-field">
        <LogInput
          placeholder="email"
          type="text"
          value={registrationForm.email}
          onChange={handleEmailChange}
        />
        {registrationForm.email.length > 0 && (
          <div
            className={`validation-message ${emailError ? "error" : "success"}`}
          >
            {emailError ? emailError : "✓"}
          </div>
        )}
      </div>
      <div className="input-field">
        <LogInput
          placeholder="Телефон"
          type="text"
          value={registrationForm.phone}
          onChange={handlePhoneChange}
        />
        {registrationForm.phone.length === 11 && (
          <div className="validation-message success">✓</div>
        )}
      </div>
      <div className="btnRegistForm">
        <CustomBtn
          onClick={registUser}
          disabled={isDisabled}
          loading={stateLoad}
        >
          Регистрация
        </CustomBtn>
        <CustomBtn onClick={closeModal}>Отмена</CustomBtn>
      </div>
    </div>
  );
});

export default FormRegistration;
