import React from 'react'

type Props = {
  value: string
  onChange(text: string): void
}

const TitleInput = ({ value, onChange }: Props) => (
  <input
    data-testid="title"
    type="text"
    placeholder="Type your title"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
)

export default TitleInput
