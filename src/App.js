import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withAuthentication, AuthUserContext } from './component/session';
import Login from './component/Auth/login';
import Order from './component/Order'
import ErrorPage from './container/404';
import Layout from './component/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
        <Route path='/order' exact component={Order} />
        <Route path='/' exact component={Login} /> 
        <Route component={ErrorPage} />
          </Switch>
      </Layout>
    </div>
  );
}

export default withAuthentication(App);
