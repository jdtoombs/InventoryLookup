import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { UserItems } from './components/UserItems';
import { UserSearchBar } from './components/UserSearchBar';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Redirect exact from="/" to="/lookup" />
        <Route path="/lookup" component={UserSearchBar} />
        <Route path="/items/:id" component={UserItems} />
      </Switch>
    </Router>
  );
};
