import React from 'react'
import { Input } from 'antd';
import './LogInput.scss'
import type { LogInputProps } from '../../../../interface/interface';

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
