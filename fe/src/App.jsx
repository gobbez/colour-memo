import { useState, useEffect } from 'react';
import { Provider } from "@/components/ui/provider"
import { Toaster, toaster } from "@/components/ui/toaster"
import './App.css';
import Title from './components/Title';
import GameComponent from './components/GameComponent';
import Login from './components/Login';

let overlayStyle = {
  visibility: 'hidden',
  opacity: '0%'
};

let modalStyle = {
  transform: 'translate(0%, 0%)'
};

function App() {

  return (
    <Provider>
      <Toaster />
      <header>
        <Title />
      </header>
      <main>
        Welcome!
        <Login />
      </main>
    </Provider>
  );
}

export default App;
