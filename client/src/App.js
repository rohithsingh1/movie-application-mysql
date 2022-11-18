import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector} from "react-redux";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute';
import PubicRoute from './components/PublicRoute'
import Home from './pages/Home'
import MovieForm from './pages/MovieForm';
import Spinner from './components/Spinner';

function App() {
   const {loading}=useSelector((state) => {
    return state.alerts
  })
  return (
    <div className="App">
      {loading&&<Spinner />}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/add-movie' element={<ProtectedRoute><MovieForm /></ProtectedRoute>}></Route>
          <Route path='/register' element={<PubicRoute><Register /></PubicRoute>}></Route>
          <Route path='/login' element={<PubicRoute><Login /></PubicRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
