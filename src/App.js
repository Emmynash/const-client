import './App.css';
import { Route, Switch } from 'react-router-dom';
import { withAuthentication } from './component/session';
import Login from './component/Auth/login';
import {  EditOrder, Order } from './component/Order'
import ErrorPage from './container/404';
import Layout from './component/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/order' exact component={Order} />
          <Route path='/order/{uid}' exact component={Order} /> 
          <Route path='/order/:uid/edit' exact component={EditOrder} /> 
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    </div>
  );
}

export default withAuthentication(App);
