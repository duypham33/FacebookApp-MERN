import {createContext, useEffect, useState} from 'react';
import './static/css/index.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import PageRender from './PageRender';
import Login from './pages/login';
import Home from './pages/home';
import Notify from './Components/Notify/Notify';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './redux/actions/authActions';
import Header from './Components/Header/Header';
import StatusModal from './Components/StatusModal';
import {getPosts} from './redux/actions/postActions';
import { getSuggestions } from './redux/actions/suggestionsActions';
import { getNotify } from './redux/actions/noticeActions';
import io from 'socket.io-client';
import GLOBAL_TYPES from './redux/actions/globalTypes';
import SocketClient from './SocketClient';
import CallModal from './Components/Message/CallModal';
import Peer from 'peerjs';


export const inverterContext = createContext();

function App() {
  
  const dispatch = useDispatch();
  const {auth, status, socket, call} = useSelector(state => state);
  const [inverter, setInverter] = useState(0);
  
  //Authen
  useEffect(() => {
    if(!auth.user)
      dispatch(getMe());
    
  }, []);

  //Get Posts, Suggestions
  useEffect(() => {
    if(auth.user){
      dispatch(getPosts());
      dispatch(getSuggestions(auth));
      dispatch(getNotify());
      
      const socketio = io.connect("http://localhost:5000");
      dispatch({type: GLOBAL_TYPES.SOCKET, payload: socketio});

      return () => socketio.close();
    }

  }, [auth.user]);


  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    });

    dispatch({type: GLOBAL_TYPES.PEER, payload: newPeer});
  }, []);

  return (

    <inverterContext.Provider value={{inverter, setInverter}}>
      <BrowserRouter>
        <Notify />
        
        <input type="checkbox" id="theme" />
        <div className="App">
          <div className="main">
            {auth.user && <Header />}
            {(status.onCreate || status.onEdit) && <StatusModal />}
            {(auth.user && socket) && <SocketClient />}
            {call && <CallModal /> }

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
