import { useEffect, useState } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import type { FormProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/indexStore';
import type { ProfileFormData } from '../../interface/interface';
import { updateProfile } from '../../API/ShopServis';

const ProfileModal = observer(() => {
  const { user, closeModals, stateModal } = authStore;
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    login: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<ProfileFormData>();
  const [api, contextHolder] = notification.useNotification();
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeModals();
  };

  const onFinish: FormProps<ProfileFormData>['onFinish'] = async (values: ProfileFormData) => {
    setLoading(true);
    try {
      const response = await updateProfile(values);

      if (response) {
        const userData = localStorage.getItem("userInfo");
        if (userData) {
          const currentUser = JSON.parse(userData);
          const updatedUser = {
            ...currentUser,
            ...values
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          authStore.user = updatedUser;
        }

        api.success({
          message: 'Профиль успешно обновлен!',
          placement: 'top',
          duration: 3,
        });

        closeModals();
      }
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      api.error({
        message: 'Ошибка при обновлении профиля',
        description: 'Попробуйте еще раз позже',
        placement: 'top',
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<ProfileFormData>['onFinishFailed'] = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Ошибка валидации формы',
      description: 'Проверьте правильность заполнения полей',
      placement: 'top',
      duration: 3,
    });
  };

  useEffect(() => {
    if (user && stateModal.profile) {
      const initialValues: ProfileFormData = {
        login: user.login || '',
        email: user.email || '',
        phone: user.phone || ''
      };

      setProfileForm(initialValues);
      form.setFieldsValue(initialValues);
    }
  }, [stateModal.profile]);

  const handleFormValuesChange = (_changedValues: Partial<ProfileFormData>, allValues: ProfileFormData) => {
    setProfileForm(allValues);
  };

  return (
    <>
      {contextHolder}
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
          <Form<ProfileFormData>
            form={form}
            name="profile"
            layout="vertical"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={handleFormValuesChange}
            initialValues={profileForm}
          >
            <Form.Item<ProfileFormData>
              label="Логин"
              name="login"
              rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ProfileFormData>
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email!' },
                { type: 'email', message: 'Пожалуйста, введите корректный email!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ProfileFormData>
              label="Телефон"
              name="phone"
              rules={[{ required: true, message: 'Пожалуйста, введите телефон!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
});

export default ProfileModal;