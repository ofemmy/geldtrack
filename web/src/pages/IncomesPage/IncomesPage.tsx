import { Link, routes } from '@redwoodjs/router'

const IncomesPage = () => {
  return (
    <>
      <h1>IncomesPage</h1>
      <p>
        Find me in <code>./web/src/pages/IncomesPage/IncomesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>incomes</code>, link to me with `
        <Link to={routes.incomes()}>Incomes</Link>`
      </p>
    </>
  )
}

export default IncomesPage
