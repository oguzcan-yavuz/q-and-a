import React, { useState, FC } from 'react'
import TextInput from '../../components/Inputs/TextInput'
import NumberInput from '../../components/Inputs/NumberInput'
import DateTimeInput from '../../components/Inputs/DateTimeInput'
import { Meeting, Body, Dispatcher } from '../../types'
import { useServices } from '../../services/context'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useForm, Controller, FormContextValues } from 'react-hook-form'

type Props = {
  loading: boolean
  onSubmit(data: Body<Meeting>): Promise<void>
  register: FormContextValues['register']
  handleSubmit: FormContextValues['handleSubmit']
  errors: FormContextValues['errors']
  reset: FormContextValues['reset']
  control: FormContextValues['control']
  RedirectWrapper: FC
}

type SetRedirect = Dispatcher<boolean>

export const useCreateMeeting = (setRedirect: SetRedirect): Pick<Props, 'loading' | 'onSubmit'> => {
  const { meetingService } = useServices()
  const [loading, setLoading] = useState(false)

  const onSubmit: Props['onSubmit'] = async (data) => {
    try {
      setLoading(true)
      console.log('data:', data)
      await meetingService.create(data)
      setLoading(false)
      setRedirect(true)
    } catch (err) {
      alert(err)
    }
  }

  return {
    loading,
    onSubmit,
  }
}

export const useRedirect = (): Pick<Props, 'RedirectWrapper'> & { setRedirect: SetRedirect } => {
  const [redirect, setRedirect] = useState(false)

  const RedirectWrapper: FC = ({ children }) => (
    <div>{redirect ? <Redirect to="/meetings" /> : children}</div>
  )

  return { setRedirect, RedirectWrapper }
}

export const CreateMeetingPresenter: FC<Props> = ({
  loading,
  onSubmit,
  register,
  handleSubmit,
  errors,
  reset,
  control,
  RedirectWrapper,
}) => (
  <RedirectWrapper>
    <Form onSubmit={handleSubmit((data) => onSubmit(data as Body<Meeting>))}>
      <div className="create-meeting__inputs">
        <TextInput
          name="title"
          placeholder="title"
          label="Type your title"
          ref={register({ required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <NumberInput
          name="conditions.maxCandidateQuestionCount"
          label="Maximum number of candidate questions"
          placeholder="Maximum number of candidate questions"
          ref={register({ required: true, min: 0, max: 10 })}
        />
        <NumberInput
          name="conditions.winnerCount"
          label="Number of questions you will answer"
          placeholder="Number of questions you will answer"
          ref={register({ required: true, min: 0, max: 50 })}
        />
        <NumberInput
          name="conditions.maxVotePerUserCount"
          label="Maximum number of votes a user have"
          placeholder="Maximum number of votes a user have"
          ref={register({ required: true, min: 0, max: 50 })}
        />
        <NumberInput
          name="conditions.maxCandidateQuestionPerUserCount"
          label="Maximum number of questions a user can send"
          placeholder="Maximum number of questions a user can send"
          ref={register({ required: true, min: 0, max: 50 })}
        />
        <Controller
          name="electionEndDate"
          as={
            <DateTimeInput
              name="electionEndDate"
              label="End date of the question submissions"
              placeholder="End date of the question submissions"
            />
          }
          control={control}
          rules={{ required: true }}
          defaultValue={new Date()}
        />
        <Controller
          name="plannedAnswerDate"
          as={
            <DateTimeInput
              name="plannedAnswerDate"
              label="When you will answer the questions"
              placeholder="When you will answer the questions"
            />
          }
          control={control}
          rules={{ required: true }}
          defaultValue={new Date()}
        />
      </div>
      <div>
        <Button type="submit" disabled={loading} variant="success">
          Save
        </Button>
        <Button type="reset" disabled={loading} variant="primary" onClick={reset}>
          Reset
        </Button>
      </div>
    </Form>
  </RedirectWrapper>
)

const CreateMeeting: FC = () => {
  const { setRedirect, RedirectWrapper } = useRedirect()
  const { loading, onSubmit } = useCreateMeeting(setRedirect)
  const { register, handleSubmit, errors, reset, control } = useForm<Body<Meeting>>()

  return CreateMeetingPresenter({
    loading,
    onSubmit,
    register,
    handleSubmit,
    errors,
    reset,
    control,
    RedirectWrapper,
  })
}

export default CreateMeeting
