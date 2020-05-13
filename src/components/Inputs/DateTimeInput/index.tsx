import React, { FC } from 'react'
import { appendTwoDotsAndSpace, toLocalISOTime } from '../../../utilities'

type Props = {
  value: Date
  label: string
  onChange(date: Date): void
}

const DateTimeInput: FC<Props> = ({ value, label, onChange }) => (
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
