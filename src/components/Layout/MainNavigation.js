import { Link } from 'react-router-dom';

import { useContext } from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../store/Auth-context';

const MainNavigation = () => {

  const contextValue = useContext(AuthContext)

  const isLoggenIn = contextValue.isLoggenIn;

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
            <button>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
