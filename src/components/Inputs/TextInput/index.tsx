import React from 'react'
import { appendTwoDotsAndSpace } from '../../../utilities'

type Props = {
  value: string
  label: string
  onChange(text: string): void
}

const TextInput = ({ value, label, onChange }: Props) => (
  <div>
    <label>
      {appendTwoDotsAndSpace(label)}
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  </div>
)

export default TextInput
