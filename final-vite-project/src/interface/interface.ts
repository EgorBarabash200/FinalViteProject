export interface ILogin {
  login: string,
  password: string
}

export interface IRegist {
  login: string,
  password: string,
  email: string,
  phone: string
}

export interface IFormOpAccuntProps {
  openRegist: () => void;
  onClose: () => void;
}

export interface IFormRegistrationProps {
  onClose: () => void;
  openLogin: () => void;
}

export interface ILogModalProps {
  isOpen: boolean;
  onClose: () => void;
  openRegist: () => void;
}

export interface LogInputProps {
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}