/* eslint-disable @typescript-eslint/no-unused-vars */
import LogInput from "../ui/input/logInput/LogInput";
import "./FormOpAccunt.scss";
import CustomBtn from "../ui/button/customBtn/CustomBtn";
import { authStore } from "../../store/indexStore";
import { observer } from "mobx-react-lite";
import { notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { LogModalProps } from "../../interface/interface";
import { useState } from "react";
import { postAuthorization } from "../../API/ShopServis";
import { isLoginFormValid } from "../../helper";

const FormOpAccunt = observer(({ closeModal, openRegistr }: LogModalProps) => {
  const { updateUser } = authStore;
  const [stateFormAuth, setStateFormAuth] = useState({
    login: "",
    password: "",
  });
  const [stateLoad, setStateLoad] = useState(false);
  const [_, contextHolder] = notification.useNotification();

  const loginUser = async () => {
    try {
      setStateLoad(true);
      const res = await postAuthorization(stateFormAuth);
      console.log(res, "res");

      if (res) {
        updateUser(res);
        notification.success({
          message: "Авторизация успешна!",
          description: "Производим вход в аккаунт",
          placement: "top",
          duration: 4,
        });
        closeModal();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      notification.error({
        message: "Ошибка авторизации",
        description: "Неверный логин или пароль",
        placement: "top",
        duration: 4,
      });
      console.error("Ошибка авторизации:", e);
    } finally {
      setStateLoad(false);
    }
  };

  return (
    <div className="mainForm">
      {contextHolder}
      <button className="close-button" onClick={closeModal}>
      <CloseOutlined />
      </button>
      <h2>Вход в аккаунт</h2>
      <LogInput
        placeholder="Логин"
        type="text"
        onChange={(e) =>
          setStateFormAuth({ ...stateFormAuth, login: e.target.value })
        }
      />
      <LogInput
        placeholder="Пароль"
        type="password"
        onChange={(e) =>
          setStateFormAuth({ ...stateFormAuth, password: e.target.value })
        }
      />
      <div className="btnForm">
        <CustomBtn
          onClick={loginUser}
          disabled={!isLoginFormValid(stateFormAuth)}
          loading={stateLoad}
        >
          Войти
        </CustomBtn>
        <CustomBtn onClick={openRegistr}>
          Регистрация
        </CustomBtn>
      </div>
    </div>
  );
});

export default FormOpAccunt;
