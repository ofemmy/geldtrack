import { ColorModeScript } from '@chakra-ui/color-mode'
import ReactDOM from 'react-dom'
import theme from 'src/theme'
import App from './App'
/**
 * When `#redwood-app` isn't empty then it's very likely that you're using
 * prerendering. So React attaches event listeners to the existing markup
 * rather than replacing it.
 * https://reactjs.org/docs/react-dom.html#hydrate
 */
const CustomApp = (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>
)
const rootElement = document.getElementById('redwood-app')

if (rootElement.children?.length > 0) {
  ReactDOM.hydrate(CustomApp, rootElement)
} else {
  ReactDOM.render(CustomApp, rootElement)
}
