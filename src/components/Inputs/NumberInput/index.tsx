import React from 'react'
import { appendTwoDotsAndSpace } from '../../../utilities'

type Props = {
  value: number
  label: string
  onChange(n: number): void
}

const NumberInput = ({ value, label, onChange }: Props) => (
  <div>
    <label>
      {appendTwoDotsAndSpace(label)}
      <input
        type="number"
        value={value.toString()}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        min="0"
      />
    </label>
  </div>
)

export default NumberInput
