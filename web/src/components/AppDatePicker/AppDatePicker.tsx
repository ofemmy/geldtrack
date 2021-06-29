import { forwardRef } from 'react'
import { TextField } from '@redwoodjs/forms'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'

const AppDatePicker = ({ inputName, defaultDate }) => {
  const [date, setDate] = useState(
    defaultDate ? new Date(defaultDate) : new Date()
  )

  const CustomInput = forwardRef((props, ref) => (
    <TextField
      {...props}
      ref={ref}
      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border"
      errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300"
    />
  ))
  return (
    <DatePicker
      isClearable
      dateFormat="dd/MM/yyyy"
      selected={date}
      onChange={(date) => setDate(date)}
      customInput={<CustomInput />}
      name={inputName}
    />
  )
}

export default AppDatePicker
