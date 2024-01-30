import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './components/store/Auth-context';

function App() {

  const contextValue = useContext(AuthContext)

  const isLoggenIn = contextValue.isLoggenIn;

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          {isLoggenIn && <UserProfile />}
          {!isLoggenIn && <Redirect to='/auth' />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
