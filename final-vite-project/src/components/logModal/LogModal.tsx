import type { LogModalProps } from '../../interface/interface';
import FormOpAccunt from '../formOpAccunt/FormOpAccunt';
import "./logModal.scss";
import { observer } from 'mobx-react-lite';

const LogModal = observer(({ closeModal, openRegistr }:LogModalProps) => {

  return (
    <div className='mainModal active' onClick={() => closeModal()}>
      <div className='modalContent' onClick={e => e.stopPropagation()}>
        <FormOpAccunt closeModal={() => closeModal()} openRegistr={openRegistr} />
      </div>
    </div>
  );
});

export default LogModal;