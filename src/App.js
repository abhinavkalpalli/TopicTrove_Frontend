
import './App.css';
import { Routes,Route } from 'react-router-dom';
import AuthRoutes from './routes/authRoutes';
import UserRoutes from './routes/userRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path={"/*"} element={<AuthRoutes/>}/>
      <Route path={"/user/*"} element={<UserRoutes/>}/>
    </Routes>
    </>
    
  );
}

export default App;
