
import './App.css';
import Header from './components/header/Header';
import LogModal from './components/logModal/LogModal';
import RegistModal from './components/registModal/RegistModal';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  return (
    <div>
      <Header />
      <LogModal />
      <RegistModal />
    </div>
  );
});

export default App;