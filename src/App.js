import './App.css';
import ToDo from './components/Todo/ToDo';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ToDo />
      </ErrorBoundary>
    </div>
  );
}

export default App;
