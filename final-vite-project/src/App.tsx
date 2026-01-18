import './App.css';
import Header from './components/header/Header';
import LogModal from './components/logModal/LogModal';
import RegistModal from './components/registModal/RegistModal';
import { observer } from 'mobx-react-lite';
import { authStore } from './store/indexStore';

const App = observer(() => {
  const { stateModal} = authStore;
  return (
    <div>
      <Header />
      {stateModal.login && <LogModal />}
      {stateModal.registr && <RegistModal />}
    </div>
  );
});

export default App;