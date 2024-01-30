import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setloader] = useState(false);

  let emailRef = useRef();
  let passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      //...
    }
    else {

      try {

        setloader(prev => !prev);

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA', {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {

          let data = await response.json()

          let message = 'authentication failes try after sometime..'

          if (data && data.error && data.error.message) {
            message = data.error.message

            alert(message)
          }

        }

        const successUser = await response.json();

        console.log(successUser)

        setloader(prev => !prev);

      }
      catch (error) {

        console.log(error)

      }
    }

  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          {!loader &&
            <button>
              {isLogin ? 'login' : 'Create Account'}
            </button>
          }
          {loader &&
            <button>
              loading..
            </button>
          }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
