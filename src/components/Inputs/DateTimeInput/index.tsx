import React, { forwardRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

type Props = {
  name: string
  placeholder?: string
  label?: string
}

const DateTimeInput = forwardRef<DatePicker, Props>(({ name, label, placeholder }, ref) => {
  const [date, setDate] = useState(new Date())

  return (
    <Form.Group>
      {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
      <DatePicker
        ref={ref}
        id={name}
        selected={date}
        name={name}
        showTimeSelect={true}
        timeFormat="p"
        dateFormat="Pp"
        placeholderText={placeholder}
        onChange={(e) => setDate(e || new Date())}
      />
    </Form.Group>
  )
})

export default DateTimeInput
