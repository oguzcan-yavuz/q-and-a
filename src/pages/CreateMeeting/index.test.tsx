import React, { ComponentProps } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { advanceTo, advanceBy, clear } from 'jest-date-mock'
import CreateMeeting from './index'
import { MemoryRouter } from 'react-router-dom'
import { datePreciseToMinutes } from '../../utilities'

const renderComponent = (props: Partial<ComponentProps<typeof CreateMeeting>>) =>
  render(<CreateMeeting {...(props as any)} />, { wrapper: MemoryRouter })

describe('<CreateMeeting />', () => {
  it('should change title', async () => {
    const { getByLabelText } = renderComponent({})
    const title = getByLabelText(/title/i) as any

    fireEvent.change(title!, { target: { value: 'some title' } })

    expect(title!.value).toBe('some title')
  })

  it('should change maxCandidateQuestionCount', async () => {
    const { getByLabelText } = renderComponent({})
    const maxCandidateQuestionCount = getByLabelText(/Maximum number of candidate questions/) as any

    fireEvent.change(maxCandidateQuestionCount!, { target: { value: '3' } })

    expect(maxCandidateQuestionCount!.value).toBe('3')
  })

  it('should change winnerCount', async () => {
    const { getByLabelText } = renderComponent({})
    const winnerCount = getByLabelText(/Number of questions you will answer/) as any

    fireEvent.change(winnerCount!, { target: { value: '1' } })

    expect(winnerCount!.value).toBe('1')
  })

  it('should change maxVotePerUserCount', async () => {
    const { getByLabelText } = renderComponent({})
    const maxVotePerUserCount = getByLabelText(/Maximum number of votes a user have/) as any

    fireEvent.change(maxVotePerUserCount!, { target: { value: '2' } })

    expect(maxVotePerUserCount!.value).toBe('2')
  })

  it('should change maxCandidateQuestionPerUserCount', async () => {
    const { getByLabelText } = renderComponent({})
    const maxCandidateQuestionPerUserCount = getByLabelText(
      /Maximum number of questions a user can send/
    ) as any

    fireEvent.change(maxCandidateQuestionPerUserCount!, { target: { value: '7' } })

    expect(maxCandidateQuestionPerUserCount!.value).toBe('7')
  })

  it('should change electionEndDate', async () => {
    const { getByLabelText } = renderComponent({})
    const electionEndDate = getByLabelText(/End date of the question submissions/) as any
    const localDate = new Date()

    fireEvent.change(electionEndDate!, { target: { value: localDate } })
    const componentDate = new Date(electionEndDate!.value)

    expect(componentDate.getUTCFullYear()).toBe(localDate.getUTCFullYear())
    expect(componentDate.getUTCMonth()).toBe(localDate.getUTCMonth())
    expect(componentDate.getUTCDate()).toBe(localDate.getUTCDate())
    expect(componentDate.getUTCHours()).toBe(localDate.getUTCHours())
    expect(componentDate.getUTCMinutes()).toBe(localDate.getUTCMinutes())
  })

  it('should change plannedAnswerDate', async () => {
    const { getByLabelText } = renderComponent({})
    const plannedAnswerDate = getByLabelText(/When you will answer the questions/) as any
    const localDate = new Date()

    fireEvent.change(plannedAnswerDate!, { target: { value: localDate } })
    const componentDate = new Date(plannedAnswerDate!.value)

    expect(componentDate.getUTCFullYear()).toBe(localDate.getUTCFullYear())
    expect(componentDate.getUTCMonth()).toBe(localDate.getUTCMonth())
    expect(componentDate.getUTCDate()).toBe(localDate.getUTCDate())
    expect(componentDate.getUTCHours()).toBe(localDate.getUTCHours())
    expect(componentDate.getUTCMinutes()).toBe(localDate.getUTCMinutes())
  })

  it('should reset', () => {
    const { getByLabelText, getByText } = renderComponent({})
    const title = getByLabelText(/title/i) as any
    const maxCandidateQuestionCount = getByLabelText(/Maximum number of candidate questions/) as any
    const winnerCount = getByLabelText(/Number of questions you will answer/) as any
    const maxVotePerUserCount = getByLabelText(/Maximum number of votes a user have/) as any
    const maxCandidateQuestionPerUserCount = getByLabelText(
      /Maximum number of questions a user can send/
    ) as any
    const electionEndDate = getByLabelText(/End date of the question submissions/) as any
    const plannedAnswerDate = getByLabelText(/When you will answer the questions/) as any
    advanceTo(new Date())
    const mockNow = datePreciseToMinutes(new Date())
    const threeMinutesInMS = 1000 * 60 * 3
    advanceBy(threeMinutesInMS)
    const localDate = new Date()
    const resetButton = getByText(/reset/i)

    fireEvent.change(title!, { target: { value: 'some title' } })
    fireEvent.change(maxCandidateQuestionCount!, { target: { value: '3' } })
    fireEvent.change(winnerCount!, { target: { value: '1' } })
    fireEvent.change(maxVotePerUserCount!, { target: { value: '2' } })
    fireEvent.change(maxCandidateQuestionPerUserCount!, { target: { value: '7' } })
    fireEvent.change(electionEndDate!, { target: { value: localDate } })
    fireEvent.change(plannedAnswerDate!, { target: { value: localDate } })

    advanceBy(-threeMinutesInMS)
    fireEvent.click(resetButton!)

    const updatedElectionEndDate = new Date(electionEndDate!.value)
    const updatedPlannedAnswerDate = new Date(plannedAnswerDate!.value)

    expect(title!.value).toEqual('')
    expect(maxCandidateQuestionCount!.value).toEqual('0')
    expect(winnerCount!.value).toEqual('0')
    expect(maxVotePerUserCount!.value).toEqual('0')
    expect(maxCandidateQuestionPerUserCount!.value).toEqual('0')
    expect(updatedElectionEndDate).toEqual(mockNow)
    expect(updatedPlannedAnswerDate).toEqual(mockNow)
    clear()
  })

  it('should save', async () => {
    const onSaveSpy = jest.fn()

    const { getByLabelText, getByText } = renderComponent({ onSave: onSaveSpy })
    const title = getByLabelText(/title/i) as any
    const maxCandidateQuestionCount = getByLabelText(/Maximum number of candidate questions/) as any
    const winnerCount = getByLabelText(/Number of questions you will answer/) as any
    const maxVotePerUserCount = getByLabelText(/Maximum number of votes a user have/) as any
    const maxCandidateQuestionPerUserCount = getByLabelText(
      /Maximum number of questions a user can send/
    ) as any
    const electionEndDate = getByLabelText(/End date of the question submissions/) as any
    const plannedAnswerDate = getByLabelText(/When you will answer the questions/) as any
    const localDate = new Date()
    const dateWithoutSeconds = datePreciseToMinutes(localDate)
    const saveButton = getByText(/save/i)

    fireEvent.change(title!, { target: { value: 'some title' } })
    fireEvent.change(maxCandidateQuestionCount!, { target: { value: '3' } })
    fireEvent.change(winnerCount!, { target: { value: '1' } })
    fireEvent.change(maxVotePerUserCount!, { target: { value: '2' } })
    fireEvent.change(maxCandidateQuestionPerUserCount!, { target: { value: '7' } })
    fireEvent.change(electionEndDate!, { target: { value: dateWithoutSeconds } })
    fireEvent.change(plannedAnswerDate!, { target: { value: dateWithoutSeconds } })
    fireEvent.click(saveButton!)

    expect(onSaveSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'some title',
        conditions: {
          maxCandidateQuestionCount: 3,
          winnerCount: 1,
          maxVotePerUserCount: 2,
          maxCandidateQuestionPerUserCount: 7,
        },
        electionEndDate: dateWithoutSeconds,
        plannedAnswerDate: dateWithoutSeconds,
      })
    )
  })
})
