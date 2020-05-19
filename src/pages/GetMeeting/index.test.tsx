import React, { ComponentProps } from 'react'
import { render, waitFor } from '@testing-library/react'
import GetMeeting from './index'
import { Meeting } from '../../types'

const renderComponent = (props: Partial<ComponentProps<typeof GetMeeting>>) =>
  render(<GetMeeting {...(props as any)} />)

const mockMeeting: Meeting = {
  id: 'bacdac16-c705-459e-9132-1a648971a84b',
  title: 'example QnA',
  conditions: {
    maxCandidateQuestionCount: 50,
    maxCandidateQuestionPerUserCount: 3,
    maxVotePerUserCount: 2,
    winnerCount: 10,
  },
  electionEndDate: new Date(),
  plannedAnswerDate: new Date(),
  questions: [],
}

describe('<GetMeeting />', () => {
  it('should not show a meeting if getMeeting returns empty object', async () => {
    const getMeetingSpy = jest.fn().mockResolvedValue({})
    const { queryByText } = renderComponent({ id: '', getMeeting: getMeetingSpy })

    expect(getMeetingSpy).toHaveBeenCalledTimes(1)
    expect(getMeetingSpy).toHaveBeenCalledWith('')
    await waitFor(() => expect(queryByText(/example/i)).toBe(null))
  })

  it('should show the meeting', async () => {
    const getMeetingSpy = jest.fn().mockResolvedValue(mockMeeting)
    const { getByText } = renderComponent({
      id: 'bacdac16-c705-459e-9132-1a648971a84b',
      getMeeting: getMeetingSpy,
    })

    expect(getMeetingSpy).toHaveBeenCalledTimes(1)
    expect(getMeetingSpy).toHaveBeenCalledWith('bacdac16-c705-459e-9132-1a648971a84b')
    await waitFor(() => expect(getByText(/example/i).innerHTML).toBe(mockMeeting.title))
  })
})
