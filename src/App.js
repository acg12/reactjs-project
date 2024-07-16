import './App.css';
import TracksPage from './pages/TracksPage/TracksPage'
import SearchPage from './pages/SearchPage/SearchPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/search'>
          <SearchPage />
        </Route>
        <Route path='/'>
          <TracksPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
