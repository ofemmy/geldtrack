import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const fonts = {
  heading: 'Inter',
}
const components = { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } }
// 3. extend the theme
const theme = extendTheme({ config, colors, fonts, components })

export default theme
