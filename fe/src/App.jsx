import { AuthProvider, useAuth } from "./AuthContext";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import './App.css';
import Title from './components/Title';
import GameComponent from './components/GameComponent';
import Login from './components/Login';

function AppContent() {
  const { userToken } = useAuth(); 
  console.log(userToken);

  return (
    <>
      <Toaster />
      <header>
        <Title />
      </header>
      <main>
        {userToken ? <GameComponent /> : <Login />}
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Provider>
        <AppContent />
      </Provider>
    </AuthProvider>
  );
}

export default App;
