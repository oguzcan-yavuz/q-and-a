import React, { ComponentProps, FC } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { CreateMeetingPresenter, useCreateMeeting, useRedirect } from './index'
import { MemoryRouter } from 'react-router-dom'
import { MeetingServiceInterface } from '../../services/meeting'
import { ServicesInterface } from '../../services'
import { mock, instance, reset } from 'ts-mockito'
import { ServiceProvider } from '../../services/context'
import { renderHook } from '@testing-library/react-hooks'
import { useForm } from 'react-hook-form'
import { Meeting, Body } from '../../types'

const renderCreateMeetingPresenter = (
  props: Partial<ComponentProps<typeof CreateMeetingPresenter>>
) => render(<CreateMeetingPresenter {...(props as any)} />, { wrapper: MemoryRouter })

describe('<CreateMeeting />', () => {
  let mockMeetingService: MeetingServiceInterface
  let mockServices: ServicesInterface
  let mockServicesWrapper: FC

  beforeEach(() => {
    mockMeetingService = mock<MeetingServiceInterface>()
    mockServices = {
      meetingService: instance(mockMeetingService),
    }
    mockServicesWrapper = ({ children }: any) => (
      <ServiceProvider services={mockServices} children={children} />
    )
  })

  afterEach(() => {
    reset(mockMeetingService)
  })

  describe('useRedirect', () => {
    it('should return setRedirect and RedirectWrapper', () => {
      const { result } = renderHook(() => useRedirect(), { wrapper: mockServicesWrapper })

      const {
        current: { setRedirect, RedirectWrapper },
      } = result

      expect(setRedirect).toBeInstanceOf(Function)
      expect(RedirectWrapper).toBeInstanceOf(Function)
    })
  })

  describe('useCreateMeeting', () => {
    it('should return loading and onSubmit', () => {
      const setRedirect = jest.fn()
      const { result } = renderHook(() => useCreateMeeting(setRedirect), {
        wrapper: mockServicesWrapper,
      })

      const {
        current: { loading, onSubmit },
      } = result

      expect(loading).toBe(false)
      expect(onSubmit).toBeInstanceOf(Function)
    })
  })

  describe('CreateMeetingPresenter', () => {
    it('should change title', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
      const title = getByLabelText(/title/i) as any

      fireEvent.change(title!, { target: { value: 'some title' } })

      expect(title!.value).toBe('some title')
    })

    it('should change maxCandidateQuestionCount', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
      const maxCandidateQuestionCount = getByLabelText(
        /Maximum number of candidate questions/
      ) as any

      fireEvent.change(maxCandidateQuestionCount!, { target: { value: '3' } })

      expect(maxCandidateQuestionCount!.value).toBe('3')
    })

    it('should change winnerCount', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
      const winnerCount = getByLabelText(/Number of questions you will answer/) as any

      fireEvent.change(winnerCount!, { target: { value: '1' } })

      expect(winnerCount!.value).toBe('1')
    })

    it('should change maxVotePerUserCount', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
      const maxVotePerUserCount = getByLabelText(/Maximum number of votes a user have/) as any

      fireEvent.change(maxVotePerUserCount!, { target: { value: '2' } })

      expect(maxVotePerUserCount!.value).toBe('2')
    })

    it('should change maxCandidateQuestionPerUserCount', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
      const maxCandidateQuestionPerUserCount = getByLabelText(
        /Maximum number of questions a user can send/
      ) as any

      fireEvent.change(maxCandidateQuestionPerUserCount!, { target: { value: '7' } })

      expect(maxCandidateQuestionPerUserCount!.value).toBe('7')
    })

    it('should change electionEndDate', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
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
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
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

    it('should reset', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const { getByLabelText, getByText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit: jest.fn(),
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
      const title = getByLabelText(/title/i) as any
      const maxCandidateQuestionCount = getByLabelText(
        /Maximum number of candidate questions/
      ) as any
      const winnerCount = getByLabelText(/Number of questions you will answer/) as any
      const maxVotePerUserCount = getByLabelText(/Maximum number of votes a user have/) as any
      const maxCandidateQuestionPerUserCount = getByLabelText(
        /Maximum number of questions a user can send/
      ) as any
      const resetButton = getByText(/reset/i)

      fireEvent.change(title!, { target: { value: 'some title' } })
      fireEvent.change(maxCandidateQuestionCount!, { target: { value: '3' } })
      fireEvent.change(winnerCount!, { target: { value: '1' } })
      fireEvent.change(maxVotePerUserCount!, { target: { value: '2' } })
      fireEvent.change(maxCandidateQuestionPerUserCount!, { target: { value: '7' } })

      fireEvent.click(resetButton!)

      expect(title!.value).toEqual('')
      expect(maxCandidateQuestionCount!.value).toEqual('0')
      expect(winnerCount!.value).toEqual('0')
      expect(maxVotePerUserCount!.value).toEqual('0')
      expect(maxCandidateQuestionPerUserCount!.value).toEqual('0')
    })

    it('should save', async () => {
      const {
        result: {
          current: { register, handleSubmit, errors, reset: resetForm, control },
        },
      } = renderHook(() => useForm<Body<Meeting>>())
      const onSubmit = jest.fn()
      const { getByLabelText, getByText } = renderCreateMeetingPresenter({
        loading: false,
        onSubmit,
        register,
        handleSubmit,
        errors,
        reset: resetForm,
        control,
        RedirectWrapper: ({ children }) => <div>{children}</div>,
      })
      const title = getByLabelText(/title/i) as any
      const maxCandidateQuestionCount = getByLabelText(
        /Maximum number of candidate questions/
      ) as any
      const winnerCount = getByLabelText(/Number of questions you will answer/) as any
      const maxVotePerUserCount = getByLabelText(/Maximum number of votes a user have/) as any
      const maxCandidateQuestionPerUserCount = getByLabelText(
        /Maximum number of questions a user can send/
      ) as any
      const saveButton = getByText(/save/i)

      fireEvent.change(title!, { target: { value: 'some title' } })
      fireEvent.change(maxCandidateQuestionCount!, { target: { value: '3' } })
      fireEvent.change(winnerCount!, { target: { value: '1' } })
      fireEvent.change(maxVotePerUserCount!, { target: { value: '2' } })
      fireEvent.change(maxCandidateQuestionPerUserCount!, { target: { value: '7' } })
      fireEvent.click(saveButton!)

      await waitFor(() =>
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'some title',
            conditions: {
              maxCandidateQuestionCount: '3',
              winnerCount: '1',
              maxVotePerUserCount: '2',
              maxCandidateQuestionPerUserCount: '7',
            },
          })
        )
      )
    })
  })
})
