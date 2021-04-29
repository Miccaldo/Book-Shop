import './App.css';
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Order from './components/Order/Order' 
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

function App(props) {

  return (
      <div>
        <Switch>
          <Route path='/cart'>
            <Cart onClick={() => props.history.push("/order")}></Cart>
          </Route>
          <Route path='/order'>
            <Order></Order>
          </Route>
          <Route path='/'>
            <Home onClick={() => props.history.push("/cart")}></Home>
          </Route>
        </Switch>
      </div>
  );
}

export default withRouter(App);
