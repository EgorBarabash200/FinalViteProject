import React from 'react'
import { Input } from 'antd';
import './LogInput.scss'
interface LogInputProps {
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const LogInput: React.FC<LogInputProps> = ({ value, type, placeholder, onChange }) => (
  <Input
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    className='logMain'
  />
);

export default LogInput
