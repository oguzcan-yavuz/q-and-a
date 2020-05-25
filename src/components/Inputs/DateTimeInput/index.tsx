import React, { FC } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

type Props = {
  value: Date
  name: string
  label: string
  placeholder: string
  required: boolean
  handleChange(date: Date): void
}

const DateTimeInput: FC<Props> = ({ name, value, label, placeholder, handleChange, required }) => (
  <Form.Group>
    {label && (
      <Form.Label htmlFor={name}>
        {label} {required && '(*)'}
      </Form.Label>
    )}
    <DatePicker
      id={name}
      name={name}
      selected={value}
      showTimeSelect={true}
      timeFormat="p"
      dateFormat="Pp"
      placeholderText={placeholder}
      onChange={(e) => handleChange(e || new Date())}
      required={required}
    />
  </Form.Group>
)

export default DateTimeInput
