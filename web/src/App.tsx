import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { ChakraProvider } from '@chakra-ui/react'
import FatalErrorPage from 'src/pages/FatalErrorPage/FatalErrorPage'
import Routes from 'src/Routes'
import '@fontsource/inter/700.css'
import '@fontsource/inter/400.css'

import './index.css'
const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider>
      <ChakraProvider>
        <Routes />
      </ChakraProvider>
    </RedwoodApolloProvider>
  </FatalErrorBoundary>
)

export default App
