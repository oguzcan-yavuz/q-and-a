import React from 'react'
import { appendTwoDotsAndSpace, toLocalISOTime } from '../../../utilities'

type Props = {
  value: Date
  label: string
  onChange(date: Date): void
}

const DateTimeInput = ({ value, label, onChange }: Props) => (
  <div>
    <label>
      {appendTwoDotsAndSpace(label)}
      <input
        type="datetime-local"
        value={toLocalISOTime(value)}
        onChange={(e) => onChange(new Date(e.target.value))}
      />
    </label>
  </div>
)

export default DateTimeInput
