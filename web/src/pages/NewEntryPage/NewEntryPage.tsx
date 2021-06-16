import { Link, routes } from '@redwoodjs/router'

const NewEntryPage = () => {
  return (
    <>
      <h1>NewEntryPage</h1>
      <p>
        Find me in <code>./web/src/pages/NewEntryPage/NewEntryPage.tsx</code>
      </p>
      <p>
        My default route is named <code>newEntry</code>, link to me with `
        <Link to={routes.newEntry()}>NewEntry</Link>`
      </p>
    </>
  )
}

export default NewEntryPage
