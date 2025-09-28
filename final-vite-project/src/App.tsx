import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import LogModal from './components/logModal/LogModal'
import RegistModal from './components/registModal/RegistModal';
function App() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isRegistModalOpen, setIsRegistModalOpen] = useState(false);
  const openLoginModal = () => {
    setIsLogModalOpen(true);
    setIsRegistModalOpen(false);
  }
  const openRegistModal = () => {
    setIsLogModalOpen(false);
    setIsRegistModalOpen(true);
  }
  const closeModals = () => {
    setIsLogModalOpen(false);
    setIsRegistModalOpen(false);
  };
  return (
    <div>
      <Header openModal={openLoginModal} />
      <LogModal
        isOpen={isLogModalOpen}
        openRegist={openRegistModal}
        onClose={closeModals} />
      <RegistModal
        isOpen={isRegistModalOpen}
        onClose={closeModals}
        openLogin={openLoginModal}
      />
    </div>
  )
}

export default App
