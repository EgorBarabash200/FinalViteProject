import FormOpAccunt from '../formOpAccunt/FormOpAccunt';
import "./logModal.scss";
import { authStore } from '../../store/indexStore';
import { observer } from 'mobx-react-lite';

const LogModal: React.FC = observer(() => {

  return (
    <div className='mainModal active' onClick={()=>authStore.closeModals()}>
      <div className='modalContent' onClick={e => e.stopPropagation()}>
        <FormOpAccunt />
      </div>
    </div>
  );
});

export default LogModal;