import React, { FC } from 'react'
import { toLocalISOTime } from '../../../utilities'
import { Form } from 'react-bootstrap'

type Props = {
  value: Date
  name: string
  label: string
  placeholder: string
  required: boolean
  onChange(date: Date): void
}

const DateTimeInput: FC<Props> = ({ name, value, label, placeholder, onChange, required }) => (
  <Form.Group>
    {label && (
      <Form.Label htmlFor={name}>
        {label} {required && '(*)'}
      </Form.Label>
    )}
    <Form.Control
      id={name}
      name={name}
      type="datetime-local"
      value={toLocalISOTime(value)}
      placeholder={placeholder}
      onChange={(e) => onChange(new Date(e.target.value))}
      required={required}
    />
  </Form.Group>
)

export default DateTimeInput
