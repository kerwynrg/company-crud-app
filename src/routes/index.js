import {
  Route,
  IndexRoute,
  Redirect
} from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import CompaniesListView from 'views/companies/List';
import CompaniesCreateView from 'views/companies/Create';
// import {
//   List as CompaniesListView,
//   Create as CompaniesCreateView
// } from 'views/companies';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <Route path='home' component={HomeView} />
    <IndexRoute component={HomeView} />
    <Redirect from='companies' to='/companies/list' />
    <Route path='companies'>
      <Route path='list' component={CompaniesListView} />
      <Route path='create' component={CompaniesCreateView} />
      <Route path='edit/:companyId' component={CompaniesCreateView} />
    </Route>
  </Route>
);
