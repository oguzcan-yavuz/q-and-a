import React, { ComponentProps, FC } from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { ListMeetingsPresenter, useGetMeetings, useCurrentMeeting } from './index'
import { Meeting, Dispatcher } from '../../types'
import { MeetingServiceInterface } from '../../services/meeting'
import { ServicesInterface } from '../../services'
import { mock, when, verify, instance, reset, deepEqual } from 'ts-mockito'
import { ServiceProvider } from '../../services/context'
import { renderHook } from '@testing-library/react-hooks'

const renderListMeetingsPresenter = (
  props: Partial<ComponentProps<typeof ListMeetingsPresenter>>
) => render(<ListMeetingsPresenter {...(props as any)} />)

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
  let mockMeetingService: MeetingServiceInterface
  let mockServices: ServicesInterface
  let mockServicesWrapper: FC
  let mockSetCurrentMeetingId: Dispatcher<string>
  let mockLinkToMeetingWrapper: FC

  beforeEach(() => {
    mockMeetingService = mock<MeetingServiceInterface>()
    mockServices = {
      meetingService: instance(mockMeetingService),
    }
    mockServicesWrapper = ({ children }) => (
      <ServiceProvider services={mockServices} children={children} />
    )
    mockSetCurrentMeetingId = jest.fn()
    mockLinkToMeetingWrapper = jest.fn().mockImplementation(({ children }) => <div>{children}</div>)
  })

  afterEach(() => {
    reset(mockMeetingService)
    jest.clearAllMocks()
  })

  describe('useGetMeetings', () => {
    it('should return the meeting', async () => {
      when(mockMeetingService.getMany(deepEqual({}))).thenResolve(mockMeetings)

      const { result, waitForNextUpdate } = renderHook(() => useGetMeetings(), {
        wrapper: mockServicesWrapper,
      })

      await waitForNextUpdate()
      const {
        current: { meetings },
      } = result

      verify(mockMeetingService.getMany(deepEqual({}))).once()
      expect(meetings).toEqual(mockMeetings)
    })
  })

  describe('useCurrentMeeting', () => {
    it('should return the props', () => {
      const {
        result: {
          current: { setCurrentMeetingId, LinkToMeetingWrapper },
        },
      } = renderHook(() => useCurrentMeeting())

      expect(setCurrentMeetingId).toBeInstanceOf(Function)
      expect(LinkToMeetingWrapper).toBeInstanceOf(Function)
    })
  })

  describe('ListMeetingsPresenter', () => {
    it('should have 0 meetings if meetings is empty', async () => {
      const { container } = renderListMeetingsPresenter({ meetings: [] })
      const meetings = container.querySelector('.list-meetings')

      await waitFor(() =>
        expect(meetings!.querySelectorAll('.list-meetings__meeting').length).toBe(0)
      )
    })

    it('should have two meetings', async () => {
      const { container } = renderListMeetingsPresenter({
        meetings: mockMeetings,
        setCurrentMeetingId: mockSetCurrentMeetingId,
        LinkToMeetingWrapper: mockLinkToMeetingWrapper,
      })
      const meetings = container.querySelector('.list-meetings')

      await waitFor(() =>
        expect(meetings!.querySelectorAll('.list-meetings__meeting').length).toBe(
          mockMeetings.length
        )
      )
    })

    it('should set current meeting id on hover', () => {
      const { getByText } = renderListMeetingsPresenter({
        meetings: mockMeetings,
        setCurrentMeetingId: mockSetCurrentMeetingId,
        LinkToMeetingWrapper: mockLinkToMeetingWrapper,
      })
      const firstMeeting = getByText(mockMeetings[0].title)

      fireEvent.mouseOver(firstMeeting)

      expect(mockSetCurrentMeetingId).toBeCalledTimes(1)
      expect(mockSetCurrentMeetingId).toHaveBeenCalledWith(mockMeetings[0].id)
    })

    it('should render LinkToMeetingWrapper', () => {
      renderListMeetingsPresenter({
        meetings: mockMeetings,
        setCurrentMeetingId: mockSetCurrentMeetingId,
        LinkToMeetingWrapper: mockLinkToMeetingWrapper,
      })

      expect(mockLinkToMeetingWrapper).toHaveBeenCalledTimes(mockMeetings.length)
    })
  })
})
