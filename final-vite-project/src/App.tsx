import './App.css';
import Header from './components/header/Header';
import LogModal from './components/logModal/LogModal';
import RegistModal from './components/registModal/RegistModal';
import { observer } from 'mobx-react-lite';
import { authStore } from './store/indexStore';
import { useEffect } from 'react';
import { catalogStore } from './store/catalogStore';
import ListCards from './components/listCards/ListCards';

const App = observer(() => {
  const { stateModal } = authStore;
  useEffect(() => {
    catalogStore.loadCategories();
  }, []);
  return (
    <div>
      <Header />
      <div className="app-content">
        <ListCards />
      </div>
      {stateModal.login && <LogModal />}
      {stateModal.registr && <RegistModal />}
    </div>
  );
});

export default App;