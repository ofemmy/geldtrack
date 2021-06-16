import { AuthProvider } from '@redwoodjs/auth'
import { createClient } from '@supabase/supabase-js'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { ChakraProvider } from '@chakra-ui/react'
import FatalErrorPage from 'src/pages/FatalErrorPage/FatalErrorPage'
import Routes from 'src/Routes'
import '@fontsource/inter/700.css'
import '@fontsource/inter/400.css'

import './index.css'
const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={supabaseClient} type="supabase">
      <RedwoodApolloProvider>
        <ChakraProvider>
          <Routes />
        </ChakraProvider>
      </RedwoodApolloProvider>
    </AuthProvider>
  </FatalErrorBoundary>
)

export default App
