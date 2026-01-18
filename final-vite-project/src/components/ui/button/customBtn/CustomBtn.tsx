import { Button } from 'antd';
import "./customBtn.scss"
import type {CustomBtnProps} from '../../../../interface/interface';
const CustomBtn: React.FC<CustomBtnProps> = ({ children, onClick, disabled, loading }) => {
  return (
    <Button
      className="catalogBtn"
      type="primary"
      onClick={onClick}
      disabled={disabled}
      loading = {loading}
    >
      {children}
    </Button>
  )
}

export default CustomBtn
