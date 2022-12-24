import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

// components
import SignUp from './components/SignUp';
import WelcomeScreen from './components/WelcomeScreen';
import Succeed from './components/Succeed';

function App() {
  return (
    <div className="App">
      <div className='Container'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<WelcomeScreen />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/succeed' element={<Succeed />} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
