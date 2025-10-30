import { useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import LogModal from './components/logModal/LogModal';
import RegistModal from './components/registModal/RegistModal';
import { authStore } from './store/indexStore';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  useEffect(() => {
    // Пользователь загружается автоматически в конструкторе store
  }, []);

  return (
    <div>
      <Header />
      <LogModal />
      <RegistModal />
    </div>
  );
});

export default App;