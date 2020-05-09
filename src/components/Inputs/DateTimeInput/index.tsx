import React from 'react'
import { appendTwoDotsAndSpace, toISOStringWithoutTimezone } from '../../../utilities'

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
        data-testid="datetime"
        type="datetime-local"
        value={toISOStringWithoutTimezone(value)}
        onChange={(e) => onChange(new Date(e.target.value))}
      />
    </label>
  </div>
)

export default DateTimeInput
