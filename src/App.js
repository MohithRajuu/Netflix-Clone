import React, { useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen/HomeScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';


const App = () => {

  const user =  useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else {
        dispatch(logout());
      }
    })
    return unsubscribe;
  }, [dispatch])

  return(
    <div className="app">
      
      <Router>
        {!user ? (
          <LoginScreen/>
        ) : (
        <Routes>
          <Route exact path='/profile' element={<ProfileScreen/>} />
          <Route exact path='/' element={<HomeScreen/>} />
        </Routes>
        )}
      </Router>
    </div>
  )
}

export default App;
