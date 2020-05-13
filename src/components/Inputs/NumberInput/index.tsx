import React, { FC } from 'react'
import { appendTwoDotsAndSpace } from '../../../utilities'

type Props = {
  value: number
  label: string
  onChange(n: number): void
}

const NumberInput: FC<Props> = ({ value, label, onChange }) => (
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
