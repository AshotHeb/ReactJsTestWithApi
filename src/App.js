import './App.css';
import ToDo from './components/pages/Todo/ToDo';
import Contacts from './components/pages/Contacts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Route, Switch } from 'react-router-dom';

const routes = [
  {
    attributes: {
      path: "/",
      exact: true,
    },
    component: <div>
      <h1>Home Page</h1>
    </div>
  },
  {
    attributes: {
      path: "/todo",
      exact: true
    },
    component: ToDo
  },
  {
    attributes: {
      path: "/contacts",
      exact: true,
    },
    component: Contacts
  }
]
function App() {

  // const routesJSX = routes.map(route => {
  //   return <Route {...route.attributes}>
  //     {<route.component />}
  //   </Route>
  // })
  return (
    <div className="App">
      <ErrorBoundary>
        <Switch>
          {/* {routesJSX} */}
          <div>hhh</div>
        </Switch>


      </ErrorBoundary>
    </div>
  );
}

export default App;
