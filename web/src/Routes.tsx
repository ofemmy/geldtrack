// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import AppLayout from './layouts/AppLayout/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={AppLayout}>
        <Route path="/new" page={NewEntryPage} name="newEntry" />
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        <Route path="/incomes" page={IncomesPage} name="incomes" />
        <Route path="/expenses" page={ExpensesPage} name="expenses" />
        <Route path="/recurrings" page={RecurringsPage} name="recurrings" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
