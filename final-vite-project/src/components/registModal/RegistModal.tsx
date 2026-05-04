import "./registModal.scss";
import FormRegistration from "../formRegistration/FormRegistration";
import { observer } from "mobx-react-lite";
import type { RegModalProps } from "../../interface/interface";

const RegistModal = observer(({ closeModal }: RegModalProps) => {
  return (
    <div className="mainRegistModal active" onClick={() => closeModal()}>
      <div className="modalRegistContent" onClick={(e) => e.stopPropagation()}>
        <FormRegistration closeModal={closeModal} />
      </div>
    </div>
  );
});

export default RegistModal;
