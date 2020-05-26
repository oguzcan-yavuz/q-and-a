import React, { useState, FC, FormEvent } from 'react'
import TextInput from '../../components/Inputs/TextInput'
import NumberInput from '../../components/Inputs/NumberInput'
import DateTimeInput from '../../components/Inputs/DateTimeInput'
import { withLogic } from '../../utilities/with-logic'
import { Meeting, Body } from '../../types'
import { useServices } from '../../services/context'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

type SaveProps = {
  loading: boolean
  onSave(data: Body<Meeting>): void
}

type Props = SaveProps

// TODO: add tests for logic functions
const SaveLogic = (): SaveProps => {
  const { meetingService } = useServices()
  const [loading, setLoading] = useState(false)

  const onSave: SaveProps['onSave'] = async (data) => {
    setLoading(true)
    await meetingService.create(data)
    setLoading(false)
  }

  return {
    loading,
    onSave,
  }
}

const CreateMeeting: FC<Props> = ({ loading, onSave }) => {
  const [title, setTitle] = useState('')
  const [maxCandidateQuestionCount, setMaxCandidateQuestionCount] = useState(0)
  const [winnerCount, setWinnerCount] = useState(0)
  const [maxVotePerUserCount, setMaxVotePerUserCount] = useState(0)
  const [maxCandidateQuestionPerUserCount, setMaxCandidateQuestionPerUserCount] = useState(0)
  const [electionEndDate, setElectionEndDate] = useState(new Date())
  const [plannedAnswerDate, setPlannedAnswerDate] = useState(new Date())
  const [redirect, setRedirect] = useState(false)

  const reset = () => {
    setTitle('')
    setMaxCandidateQuestionCount(0)
    setWinnerCount(0)
    setMaxVotePerUserCount(0)
    setMaxCandidateQuestionPerUserCount(0)
    setElectionEndDate(new Date())
    setPlannedAnswerDate(new Date())
  }

  // TODO: this should redirect to the profile page of the user?
  // TODO: instead of `redirect` state maybe a state with three options can be used for: not submitted, submit fail and submit success
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const meeting = {
      title,
      conditions: {
        maxCandidateQuestionCount,
        winnerCount,
        maxVotePerUserCount,
        maxCandidateQuestionPerUserCount,
      },
      electionEndDate,
      plannedAnswerDate,
    }
    try {
      await onSave(meeting)
      setRedirect(true)
    } catch (err) {
      alert(err)
    }
  }

  return redirect ? (
    <Redirect to="/meetings" />
  ) : (
    <Form onSubmit={handleSubmit}>
      <div className="create-meeting__inputs">
        <TextInput
          name="title"
          placeholder="title"
          required={true}
          value={title}
          label="Type your title"
          handleChange={setTitle}
        />
        <NumberInput
          name="maxCandidateQuestionCount"
          value={maxCandidateQuestionCount}
          label="Maximum number of candidate questions"
          placeholder="Maximum number of candidate questions"
          handleChange={setMaxCandidateQuestionCount}
          min="0"
          max="10"
          required={true}
        />
        <NumberInput
          name="winnerCount"
          value={winnerCount}
          label="Number of questions you will answer"
          placeholder="Number of questions you will answer"
          handleChange={setWinnerCount}
          min="0"
          max="50"
          required={true}
        />
        <NumberInput
          name="maxVotePerUserCount"
          value={maxVotePerUserCount}
          label="Maximum number of votes a user have"
          placeholder="Maximum number of votes a user have"
          handleChange={setMaxVotePerUserCount}
          min="0"
          max="50"
          required={true}
        />
        <NumberInput
          name="maxCandidateQuestionPerUserCount"
          value={maxCandidateQuestionPerUserCount}
          label="Maximum number of questions a user can send"
          placeholder="Maximum number of questions a user can send"
          handleChange={setMaxCandidateQuestionPerUserCount}
          min="0"
          max="50"
          required={true}
        />
        <DateTimeInput
          name="electionEndDate"
          value={electionEndDate}
          label="End date of the question submissions"
          placeholder="End date of the question submissions"
          handleChange={setElectionEndDate}
          required={true}
        />
        <DateTimeInput
          name="plannedAnswerDate"
          value={plannedAnswerDate}
          label="When you will answer the questions"
          placeholder="When you will answer the questions"
          handleChange={setPlannedAnswerDate}
          required={true}
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
  )
}

export default withLogic([SaveLogic], CreateMeeting)
