import React, { useState } from 'react'
import './LoginScreen.css'
import SignInScreen from '../SignUp/SignInScreen'

// BG IMAGE: https://miro.medium.com/max/1400/1*5lyavS59mazOFnb55Z6znQ.png

const LoginScreen = () => {

    const [signIn, setSignIn] = useState(false)

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img 
                    className="loginScreen__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                    alt="" 
                />
                <button
                    className="loginScreen__button"
                    onClick={() => setSignIn(true)}
                >
                Sign In
                </button>
                <div className="loginScreen__gradient" />
            </div>

            <div className="loginScreen__body">
                {signIn ? (
                    <SignInScreen />
                ) : (
                <>
                    <h1>Unlimited Films, TV programmes and more.</h1>
                    <h2>Watch anywhere. Cancel anytime</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership</h3>
                    
                    <div className="loginScreen__input">
                        <form>
                            <input
                                type="email" placeholder='Email'
                            />
                            <button 
                                onClick={() => setSignIn(true)}
                                className="loginScreen__getStarted">
                                GET STARTED </button>
                        </form>
                    </div>
                </> )}
            </div>
        </div>
    )
}

export default LoginScreen
