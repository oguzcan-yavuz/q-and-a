import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

type Props = {
  name: string
  placeholder?: string
  label?: string
}

const TextInput = forwardRef<HTMLInputElement, Props>(({ name, placeholder, label }, ref) => (
  <Form.Group>
    {label && (
      <Form.Label as="label" htmlFor={name}>
        {label}
      </Form.Label>
    )}
    <Form.Control
      ref={ref}
      id={name}
      className="form-control"
      name={name}
      placeholder={placeholder}
    />
  </Form.Group>
))

export default TextInput
