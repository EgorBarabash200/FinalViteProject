import "./registModal.scss";
import FormRegistration from '../formRegistration/FormRegistration';
import { authStore } from '../../store/indexStore';
import { observer } from 'mobx-react-lite';

const RegistModal: React.FC = observer(() => {
  return (
    <div className='mainRegistModal active' onClick={()=>authStore.closeModals()}>
      <div className='modalRegistContent' onClick={e => e.stopPropagation()}>
        <FormRegistration />
      </div>
    </div>
  );
});

export default RegistModal;