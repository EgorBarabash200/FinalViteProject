import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './App.css';
import Header from './components/header/Header';
import ListCards from './components/listCards/ListCards';
import { catalogStore } from './store/catalogStore';

const App = observer(() => {
  useEffect(() => {
    catalogStore.loadCategories();
  }, []);
  
  return (
    <div>
      <Header />
      <div className="app-content">
        <ListCards />
      </div>
    </div>
  );
});

export default App;