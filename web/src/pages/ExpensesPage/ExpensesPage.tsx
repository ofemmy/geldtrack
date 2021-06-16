import { Link, routes } from '@redwoodjs/router'

const ExpensesPage = () => {
  return (
    <>
      <h1>ExpensesPage</h1>
      <p>
        Find me in <code>./web/src/pages/ExpensesPage/ExpensesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>expenses</code>, link to me with `
        <Link to={routes.expenses()}>Expenses</Link>`
      </p>
    </>
  )
}

export default ExpensesPage
