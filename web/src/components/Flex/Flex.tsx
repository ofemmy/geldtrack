import { cx } from 'src/utils/UtilFunctions'
const Flex = ({ children, classes = '', center = false, ...props }) => {
  return (
    <div
      className={cx(
        classes,
        center ? 'items-center justify-center' : '',
        'flex'
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Flex
