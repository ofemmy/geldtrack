import { cx } from 'src/utils/UtilFunctions'
const Button = ({
  children,
  color = '',
  classes = '',

  ...props
}) => {
  return (
    <button
      type="button"
      //onClick={onClick}
      {...props}
      className={cx(
        color
          ? `text-${color}-700 bg-${color}-100 hover:bg-${color}-200 focus:ring-${color}-500`
          : 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
        classes,
        'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 '
      )}
    >
      {children}
    </button>
  )
}

export default Button
