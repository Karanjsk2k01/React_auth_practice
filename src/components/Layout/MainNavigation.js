import { Link, useHistory } from 'react-router-dom';

import { useContext } from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../store/Auth-context';

const MainNavigation = () => {

  const contextValue = useContext(AuthContext);
  const history = useHistory()

  const isLoggenIn = contextValue.isLoggenIn;


  const logoutHandler = () => {
    contextValue.logout()


  }

  if (!isLoggenIn) {
    history.push('/auth')
  }


  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggenIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggenIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggenIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
