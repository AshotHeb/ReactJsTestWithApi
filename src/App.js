import './App.css';
import ToDo from './components/Todo/ToDo';
import Contacts from './components/pages/Contacts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact>
            <div>
              <h1>Home Page</h1>
            </div>
          </Route>
          <Route path="/todo" exact>
            <ToDo />
          </Route>
          <Route path="/contacts" exact>
            <Contacts />
          </Route>
        </Switch>


      </ErrorBoundary>
    </div>
  );
}

export default App;
