import React, { FC } from 'react'
import { Form } from 'react-bootstrap'

type Props = {
  name: string
  required: boolean
  placeholder: string
  min: string
  max: string
  value: number
  label: string
  onChange(n: number): void
}

const NumberInput: FC<Props> = ({
  name,
  min,
  max,
  placeholder,
  value,
  label,
  onChange,
  required,
}) => (
  <Form.Group>
    {label && (
      <Form.Label htmlFor={name}>
        {label} {required && '(*)'}
      </Form.Label>
    )}
    <Form.Control
      id={name}
      name={name}
      value={value.toString()}
      placeholder={placeholder}
      min={min}
      max={max}
      required={required}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
    />
  </Form.Group>
)

export default NumberInput
