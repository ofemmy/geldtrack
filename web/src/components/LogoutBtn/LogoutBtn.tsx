import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import Button from 'src/components/Button/Button'
const LogoutBtn = () => {
  const { logOut } = useAuth()
  const logOutHdlr = () => {
    logOut().then(() => navigate(routes.login()))
  }
  return (
    <Button onClick={logOutHdlr} color="red">
      Log out
    </Button>
  )
}

export default LogoutBtn
