import React, { ComponentProps } from 'react'
import { render, waitFor } from '@testing-library/react'
import ListMeetings from './index'
import { Meeting } from '../../types'
import { MemoryRouter } from 'react-router-dom'

const renderComponent = (props: Partial<ComponentProps<typeof ListMeetings>>) =>
  render(<ListMeetings {...(props as any)} />, { wrapper: MemoryRouter })

const mockMeetings: Meeting[] = [
  {
    id: '77374755-234c-4a9a-92df-4c301fd69c97',
    title: 'first QnA',
    conditions: {
      winnerCount: 10,
      maxCandidateQuestionCount: 50,
      maxCandidateQuestionPerUserCount: 3,
      maxVotePerUserCount: 2,
    },
    electionEndDate: new Date(),
    plannedAnswerDate: new Date(),
    questions: [],
  },
  {
    id: '44eff65b-495d-4564-8d96-6481afcf57d6',
    title: 'second QnA',
    conditions: {
      winnerCount: 10,
      maxCandidateQuestionCount: 50,
      maxCandidateQuestionPerUserCount: 3,
      maxVotePerUserCount: 2,
    },
    electionEndDate: new Date(),
    plannedAnswerDate: new Date(),
    questions: [],
  },
]

describe('<ListMeetings />', () => {
  it('should have 0 meetings if getMeetings returns empty list', async () => {
    const getMeetingsSpy = jest.fn().mockResolvedValue([])
    const { container } = renderComponent({ getMeetings: getMeetingsSpy })
    const meetings = container.querySelector('.list-meetings__meetings')

    expect(getMeetingsSpy).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(meetings!.querySelectorAll('li').length).toBe(0))
  })

  it('should have two meetings', async () => {
    const getMeetingsSpy = jest.fn().mockResolvedValue(mockMeetings)
    const { container } = renderComponent({ getMeetings: getMeetingsSpy })
    const meetings = container.querySelector('.list-meetings__meetings')

    expect(getMeetingsSpy).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(meetings!.querySelectorAll('li').length).toBe(2))
  })
})
