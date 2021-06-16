import { Link, routes } from '@redwoodjs/router'

const RecurringsPage = () => {
  return (
    <>
      <h1>RecurringsPage</h1>
      <p>
        Find me in <code>./web/src/pages/RecurringsPage/RecurringsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>recurrings</code>, link to me with `
        <Link to={routes.recurrings()}>Recurrings</Link>`
      </p>
    </>
  )
}

export default RecurringsPage
