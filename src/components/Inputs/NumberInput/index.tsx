import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

type Props = {
  name: string
  placeholder?: string
  label?: string
}

const NumberInput = forwardRef<HTMLInputElement, Props>(({ name, placeholder, label }, ref) => (
  <Form.Group>
    {label && (
      <Form.Label as="label" htmlFor={name}>
        {label}
      </Form.Label>
    )}
    <Form.Control
      type="number"
      ref={ref}
      id={name}
      className="form-control"
      name={name}
      placeholder={placeholder}
      defaultValue="0"
    />
  </Form.Group>
))

export default NumberInput
