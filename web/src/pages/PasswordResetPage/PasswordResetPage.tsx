import { Link, routes } from '@redwoodjs/router'

const PasswordResetPage = () => {
  return (
    <>
      <h1>PasswordResetPage</h1>
      <p>
        Find me in <code>./web/src/pages/PasswordResetPage/PasswordResetPage.tsx</code>
      </p>
      <p>
        My default route is named <code>passwordReset</code>, link to me with `
        <Link to={routes.passwordReset()}>PasswordReset</Link>`
      </p>
    </>
  )
}

export default PasswordResetPage
