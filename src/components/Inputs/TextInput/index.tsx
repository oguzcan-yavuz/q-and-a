import React, { FC } from 'react'
import { Form } from 'react-bootstrap'

type Props = {
  name: string
  placeholder: string
  value: string
  label: string
  required: boolean
  onChange(text: string): void
}

const TextInput: FC<Props> = ({ name, placeholder, value, label, onChange, required }) => (
  <Form.Group>
    {label && (
      <Form.Label as="label" htmlFor={name}>
        {label} {required && '(*)'}
      </Form.Label>
    )}
    <Form.Control
      id={name}
      className="form-control"
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </Form.Group>
)

export default TextInput
