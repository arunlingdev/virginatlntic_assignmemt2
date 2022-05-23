import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import ErrorPage from '../components/ErrorPage';
import '../styles/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../components/Header';

/**
 * Main Component where start app ui-search
 * @constant
 * @type {function}
 * @returns {JSX}
 */
const App = () => {

  return (
    <Fragment>
      <div className="ui-search">
        <Router>
          <Header />
          <div
            className='containers'>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      </div>
    </Fragment>
  );
};

export default App;
