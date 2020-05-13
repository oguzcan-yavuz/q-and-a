import React, { ComponentProps } from 'react'
import { render, waitFor } from '@testing-library/react'
import ListMeetings from './index'
import { Meeting } from '../../types'

const renderComponent = (props: Partial<ComponentProps<typeof ListMeetings>>) =>
  render(<ListMeetings {...(props as any)} />)

const mockMeetings: Meeting[] = [
  {
    title: 'first q&a',
    maxCandidateQuestionCount: 50,
    maxCandidateQuestionPerUserCount: 3,
    maxVotePerUserCount: 2,
    electionEndDate: new Date(),
    winnerCount: 10,
    plannedAnswerDate: new Date(),
    questions: [],
  },
  {
    title: 'second q&a',
    maxCandidateQuestionCount: 50,
    maxCandidateQuestionPerUserCount: 3,
    maxVotePerUserCount: 2,
    electionEndDate: new Date(),
    winnerCount: 10,
    plannedAnswerDate: new Date(),
    questions: [],
  },
]

describe('<ListMeetings />', () => {
  it('should have 0 meetings if getMeetings is not given', async () => {
    const getMeetingsSpy = jest.fn().mockResolvedValue([])
    const { container } = renderComponent({ getMeetings: getMeetingsSpy })
    const meetings = container.querySelector('.list-meetings__meetings')

    expect(meetings).not.toBe(null)
    await waitFor(() => expect(meetings!.querySelectorAll('li').length).toBe(0))
  })

  it('should have two meetings', async () => {
    const getMeetingsSpy = jest.fn().mockResolvedValue(mockMeetings)
    const { container } = renderComponent({ getMeetings: getMeetingsSpy })
    const meetings = container.querySelector('.list-meetings__meetings')

    expect(getMeetingsSpy).toHaveBeenCalledTimes(1)
    expect(meetings).not.toBe(null)
    await waitFor(() => expect(meetings!.querySelectorAll('li').length).toBe(2))
  })
})
