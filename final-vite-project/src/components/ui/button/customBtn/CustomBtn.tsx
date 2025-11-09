import { Button } from 'antd';
import "./customBtn.scss"
import type {CustomBtnProps} from '../../../../interface/interface';
const CustomBtn: React.FC<CustomBtnProps> = ({ children, onClick, disabled }) => {
  return (
    <Button
      className="catalogBtn"
      type="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default CustomBtn
