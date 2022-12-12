import {createContext, useEffect, useState} from 'react';
import './static/css/index.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import PageRender from './PageRender';
import Login from './pages/login';
import Home from './pages/home';
import Notify from './Components/Notify/Notify';
//import axios from 'axios';
//import GLOBAL_TYPES from './redux/actions/globalTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './redux/actions/authActions';
import Header from './Components/Header/Header';


export const inverterContext = createContext();

function App() {
  
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [inverter, setInverter] = useState(0);
  
  useEffect(() => {
    if(!auth.user)
      dispatch(getMe());
    
  }, []);

  return (

    <inverterContext.Provider value={{inverter, setInverter}}>
      <BrowserRouter>
        <Notify />
        
        <input type="checkbox" id="theme" />
        <div className="App">
          <div className="main">
            {auth.user && <Header />}

            <Routes>
              <Route exact path="/" element={auth.user ? <Home /> : <Login />} />
              <Route exact path="/:page" element={<PageRender />} />
              <Route exact path="/:page/:id" element={<PageRender />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </inverterContext.Provider>

  );
}

export default App;
