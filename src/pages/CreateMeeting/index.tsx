import React, { useState, FC, FormEvent } from 'react'
import TextInput from '../../components/Inputs/TextInput'
import NumberInput from '../../components/Inputs/NumberInput'
import DateTimeInput from '../../components/Inputs/DateTimeInput'
import { withLogic } from '../../utilities/with-logic'
import { Meeting, Body } from '../../types'
import { useServices } from '../../services/context'
import { Form, Button } from 'react-bootstrap'

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

  const reset = () => {
    setTitle('')
    setMaxCandidateQuestionCount(0)
    setWinnerCount(0)
    setMaxVotePerUserCount(0)
    setMaxCandidateQuestionPerUserCount(0)
    setElectionEndDate(new Date())
    setPlannedAnswerDate(new Date())
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <Form onSubmit={handleSubmit}>
      <div className="create-meeting__inputs">
        <TextInput
          name="title"
          placeholder="title"
          required={true}
          value={title}
          label="Type your title"
          onChange={setTitle}
        />
        <NumberInput
          name="maxCandidateQuestionCount"
          value={maxCandidateQuestionCount}
          label="Maximum number of candidate questions"
          placeholder="Maximum number of candidate questions"
          onChange={setMaxCandidateQuestionCount}
          min="0"
          max="10"
          required={true}
        />
        <NumberInput
          name="winnerCount"
          value={winnerCount}
          label="Number of questions you will answer"
          placeholder="Number of questions you will answer"
          onChange={setWinnerCount}
          min="0"
          max="50"
          required={true}
        />
        <NumberInput
          name="maxVotePerUserCount"
          value={maxVotePerUserCount}
          label="Maximum number of votes a user have"
          placeholder="Maximum number of votes a user have"
          onChange={setMaxVotePerUserCount}
          min="0"
          max="50"
          required={true}
        />
        <NumberInput
          name="maxCandidateQuestionPerUserCount"
          value={maxCandidateQuestionPerUserCount}
          label="Maximum number of questions a user can send"
          placeholder="Maximum number of questions a user can send"
          onChange={setMaxCandidateQuestionPerUserCount}
          min="0"
          max="50"
          required={true}
        />
        <DateTimeInput
          name="electionEndDate"
          value={electionEndDate}
          label="End date of the question submissions"
          placeholder="End date of the question submissions"
          onChange={setElectionEndDate}
          required={true}
        />
        <DateTimeInput
          name="plannedAnswerDate"
          value={plannedAnswerDate}
          label="When you will answer the questions"
          placeholder="When you will answer the questions"
          onChange={setPlannedAnswerDate}
          required={true}
        />
      </div>
      <div>
        <Button
          type="submit"
          disabled={loading}
          variant="success"
          onClick={() =>
            onSave({
              title,
              conditions: {
                maxCandidateQuestionCount,
                winnerCount,
                maxVotePerUserCount,
                maxCandidateQuestionPerUserCount,
              },
              electionEndDate,
              plannedAnswerDate,
            })
          }
        >
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
