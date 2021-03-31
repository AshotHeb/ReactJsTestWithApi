import './App.css';
import ToDo from './components/pages/Todo/ToDo';
import Contacts from './components/pages/Contacts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
// import Hooks from './demo/Hooks';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/Login/Login';

const routes = [
  // {
  //   attributes: {
  //     path: "/",
  //     exact: true,
  //   },
  //   component: <div>
  //     <h1>Home Page</h1>
  //   </div>
  // },
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
  },
  {
    attributes: {
      path: "/registration",
      exact: true,
    },
    component: Registration
  }, {
    attributes: {
      path: "/login",
      exact: true,
    },
    component: Login
  }
]
function App(props) {
  // return <Hooks />

  const { loading, errorMessage } = props;
  const routesJSX = routes.map(route => {
    return <Route
      {...route.attributes}
      component={route.component}
      key={route.attributes.path}
    />
  });
  if (errorMessage) {
    toast.error(`${errorMessage}`);
  }
  return (
    <div className="App">
      <ErrorBoundary>
        <Switch>
          {routesJSX}
        </Switch>
        {
          loading && <Spinner />
        }

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      </ErrorBoundary>
    </div>
  );

}


const mapStateToProps = (state) => ({
  loading: state.loading,
  errorMessage: state.errorMessage
})
export default connect(mapStateToProps)(App);
