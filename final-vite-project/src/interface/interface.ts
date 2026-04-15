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
  setUser: any;
}

export interface IFormRegistrationProps {
  onClose: () => void;
  openLogin: () => void;
}

export interface ILogModalProps {
  isOpen: boolean;
  onClose: () => void;
  openRegist: () => void;
  setUser: any;
}

export interface LogInputProps {
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface HeaderProps {
  openModal: () => void;
  user: any;
}

export interface CustomBtnProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
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

export interface ProfileData {
  login: string;
  email: string;
  phone: string;
}

export interface User {
  login: string;
  email?: string;
  phone?: string;
}

export interface ProfileFormData {
  login: string;
  email: string;
  phone: string;
}

export interface Item {
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
  image?: string;
}
export interface Category {
  category: string;
  items: Item[];
}

export interface ProductCardProps {
  item: Item;
}

export interface LogModalProps {
  closeModal: () => void;
  openRegistr: () => void;
}

export interface IValidFormLogin {
    login: string
    password: string
}