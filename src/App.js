import { Switch, Route } from 'react-router-dom';
import PublicRoutes from "./components/Routes/PublicRoutes";
import PrivateRoutes from "./components/Routes/PrivateRoutes";

const App = () => {
  return (<div>
  <Switch>
    <Route path='/app' component={PrivateRoutes} />
    <Route path='/' component={PublicRoutes} />
  </Switch>
</div>)
}
export default App;