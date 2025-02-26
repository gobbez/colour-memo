import { useState } from 'react';
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import './App.css';
import Title from './components/Title';
import GameComponent from './components/GameComponent';
import Login from './components/Login';

function App() {
  const [userToken, setUserToken] = useState(null);

  return (
    <Provider>
      <Toaster />
      <header>
        <Title />
      </header>
      <main>
        {userToken ? (
          <GameComponent token={userToken} />
        ) : (
          <Login onLoginSuccess={(token) => setUserToken(token)} />
        )}
      </main>
    </Provider>
  );
}

export default App;
