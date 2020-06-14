import React, { ComponentProps } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useGetMeeting, GetMeetingPresenter, useDeleteMeeting } from './index'
import { Meeting } from '../../types'
import { renderHook } from '@testing-library/react-hooks'
import { ServiceProvider } from '../../services/context'
import { mock, when, instance, verify } from 'ts-mockito'
import { ServicesInterface } from '../../services'
import { MeetingServiceInterface } from '../../services/meeting'

const renderGetMeetingPresenter = (props: Partial<ComponentProps<typeof GetMeetingPresenter>>) =>
  render(<GetMeetingPresenter {...(props as any)} />)

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
  describe('useGetMeeting', () => {
    it('should return the meeting', async () => {
      const mockMeetingService = mock<MeetingServiceInterface>()
      when(mockMeetingService.getById(mockMeeting.id)).thenResolve(mockMeeting)
      const mockMeetingServiceInstance = instance(mockMeetingService)
      const mockServices = mock<ServicesInterface>()
      when(mockServices.meetingService).thenReturn(mockMeetingServiceInstance)
      const mockServicesInstance = instance(mockServices)

      const wrapper = ({ children }: any) => (
        <ServiceProvider services={mockServicesInstance} children={children} />
      )

      const { result, waitForNextUpdate } = renderHook(() => useGetMeeting(mockMeeting.id), {
        wrapper,
      })

      await waitForNextUpdate()
      const {
        current: { meeting },
      } = result

      verify(mockMeetingService.getById(mockMeeting.id)).once()
      expect(meeting).toEqual(mockMeeting)
    })
  })

  describe('useDeleteMeeting', () => {
    it('should return the handleDelete function', async () => {
      const {
        result: {
          current: { handleDelete },
        },
      } = renderHook(() => useDeleteMeeting(mockMeeting.id))

      expect(handleDelete).toBeInstanceOf(Function)
    })
  })

  describe('GetMeetingPresenter', () => {
    it('should not show a meeting if the meeting is an empty object', () => {
      const { queryByText } = renderGetMeetingPresenter({})
      const title = queryByText(/example/i)

      expect(title).toBe(null)
    })

    it('should show the meeting', async () => {
      const { getByText } = renderGetMeetingPresenter({ meeting: mockMeeting })
      const title = getByText(mockMeeting.title)

      expect(title.innerHTML).toBe(mockMeeting.title)
    })

    it('should call the delete handler', () => {
      const handleDeleteSpy = jest.fn()
      const { getByText } = renderGetMeetingPresenter({
        meeting: mockMeeting,
        handleDelete: handleDeleteSpy,
      })
      const dropdownToggle = getByText('...')
      fireEvent.click(dropdownToggle)
      const dropdownDeleteItem = getByText(/Delete Meeting/i)
      fireEvent.click(dropdownDeleteItem)

      expect(handleDeleteSpy).toHaveBeenCalledTimes(1)
    })
  })
})
