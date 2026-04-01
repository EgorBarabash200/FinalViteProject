import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './App.css';
import Header from './components/header/Header';
import LogModal from './components/logModal/LogModal';
import RegistModal from './components/registModal/RegistModal';
import ListCards from './components/listCards/ListCards';
import { authStore } from './store/indexStore';
import { catalogStore } from './store/catalogStore';

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