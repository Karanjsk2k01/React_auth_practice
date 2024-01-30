import AuthContext from '../store/Auth-context';
import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {

  const passwordRef = useRef()
  const contextValue = useContext(AuthContext);
  const history = useHistory();

  const passwordChangeHandler = async (e, token) => {
    e.preventDefault();

    try {
      if (token) {
        const enteredPassword = passwordRef.current.value;

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA', {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error.message);
        }

        const { idToken } = await response.json();

        if (idToken) {
          alert('Password Changed successfully')

          history.push('/')
        }


      }
    } catch (error) {
      alert(error.message);
    }
  };



  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' required ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={(e) => { passwordChangeHandler(e, contextValue?.token) }}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
