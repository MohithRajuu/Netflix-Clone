import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/counter/userSlice';
import './ProfileScreen.css'
import { auth } from '../../firebase';
import PlansScreen from '../PlansScreen/PlansScreen';


const ProfileScreen = () => {

  const user = useSelector(selectUser);

  return (
        <div className="profileScreen">
          <Navbar />
          <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
              <img 
                  src="https://pro2-bar-s3-cdn-cf.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/8e65207aca8751179e10e03c_rw_600.png?h=506076a9f26fdf62293000f07c8c3c78" 
                  alt="" 
              />
              <div className="profileScreen__details">
                <h2>{user.email}</h2>
                <div className="profileScreen__plans">
                  <h3>Plans</h3>
                  <PlansScreen />
                  
                  <button 
                    onClick={() => auth.signOut()} 
                    className="profileScreen__signOut">Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
)};

export default ProfileScreen;
