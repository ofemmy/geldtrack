const PercentageBar = ({ value }) => {
  const fillerStyle = { width: `${Math.min(value, 100)}%` }
  return (
    <div className="h-5 bg-gray-200 w-full rounded-lg overflow-hidden">
      <div
        style={fillerStyle}
        className={`bg-${determineColor(
          value
        )}-500 h-full rounded-lg flex items-center text-right overflow-hidden`}
      >
        <span className="p-3 text-white font-bold text-sm ml-auto">
          {Math.min(value, 100)}%
        </span>
      </div>
    </div>
  )
}

export default PercentageBar

function determineColor(value) {
  //<value <= 75 -> green
  //value btwn 76 and 95 -> yellow
  //value > 95 ->red
  let color = 'green'
  if (value >= 60 && value <= 95) color = 'yellow'
  if (value > 95) color = 'red'
  return color
}
