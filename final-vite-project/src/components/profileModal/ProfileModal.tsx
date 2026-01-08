import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import type { FormProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/indexStore';
import './profileModal.scss';
import type { ProfileFormData } from '../../interface/interface';
import { updateProfile } from '../../API/ShopServis';

type FieldType = ProfileFormData; 

const ProfileModal = observer(() => {
  const { user, closeModals, stateModal } = authStore;
  
  const [profileForm, setProfileForm] = useState<FieldType>({
    login: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FieldType>();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeModals();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    setLoading(true);
    try {
      // Отправляем PUT-запрос для обновления профиля
      const response = await updateProfile(values);
      
      if (response) {
        // Обновляем данные в LocalStorage
        const userData = localStorage.getItem("userInfo");
        if (userData) {
          const currentUser = JSON.parse(userData);
          const updatedUser = {
            ...currentUser,
            ...values
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          
          // Обновляем пользователя в store
          authStore.user = updatedUser;
        }
        
        notification.success({
          message: 'Профиль успешно обновлен!',
          placement: 'top',
          duration: 3,
        });
        
        closeModals();
      }
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      notification.error({
        message: 'Ошибка при обновлении профиля',
        description: 'Попробуйте еще раз позже',
        placement: 'top',
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Ошибка валидации формы',
      description: 'Проверьте правильность заполнения полей',
      placement: 'top',
      duration: 3,
    });
  };

  // Заполняем форму данными пользователя при открытии модалки
  useEffect(() => {
    if (user && stateModal.profile) {
      const initialValues: FieldType = {
        login: user.login || '',
        email: user.email || '',
        phone: user.phone || ''
      };
      
      setProfileForm(initialValues);
      form.setFieldsValue(initialValues);
    }
  }, [user, stateModal.profile, form]);

  // Обработчик изменения значений формы
  const handleFormValuesChange = (_changedValues: Partial<FieldType>, allValues: FieldType) => {
    setProfileForm(allValues);
  };

  return (
    <Modal
      title="Профиль пользователя"
      open={stateModal.profile}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Сохранить"
      cancelText="Отмена"
      className="profile-modal"
      confirmLoading={loading}
    >
      {user && (
        <Form<FieldType>
          form={form}
          name="profile"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onValuesChange={handleFormValuesChange}
          initialValues={profileForm}
        >
          <Form.Item<FieldType>
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Пожалуйста, введите корректный email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: 'Пожалуйста, введите телефон!' }]}
          >
            <Input />
          </Form.Item>

          {/* Скрытая кнопка для отправки формы по Enter */}
          <Form.Item<FieldType> wrapperCol={{ offset: 8, span: 16 }} style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
});

export default ProfileModal;