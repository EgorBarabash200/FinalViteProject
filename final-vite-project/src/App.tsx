import React, { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import LogModal from './logModal/LogModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Header openModal={() => setIsModalOpen(true)} />
      <LogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default App
