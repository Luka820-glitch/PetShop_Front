import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/routes'
import { ToastContainer } from 'react-toastify';
import CurrencyContextProvider from "./contexts/CurrencyContext"

const App: React.FC = () =>{
  return (
    <CurrencyContextProvider>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>
    </CurrencyContextProvider>
   
  );
}
export default App
