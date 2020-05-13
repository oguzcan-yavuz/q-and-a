import React, { useState, FC } from 'react'
import TextInput from '../../components/Inputs/TextInput'
import NumberInput from '../../components/Inputs/NumberInput'
import DateTimeInput from '../../components/Inputs/DateTimeInput'
import { withLogic } from '../../utilities/with-logic'
import { Meeting } from '../../types'

type SaveProps = {
  loading: boolean
  onSave(data: Meeting): void
}

type Props = SaveProps

const SaveLogic = (): SaveProps => {
  const [loading, setLoading] = useState(false)

  const onSave: SaveProps['onSave'] = async (data) => {
    console.log('on save data:', data)
    setLoading(true)
    // TODO: call the meeting service
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

  return (
    <div>
      <div className="create-meeting__inputs">
        <TextInput value={title} label="Type your title" onChange={setTitle} />
        <NumberInput
          value={maxCandidateQuestionCount}
          label="Maximum number of candidate questions"
          onChange={setMaxCandidateQuestionCount}
        />
        <NumberInput
          value={winnerCount}
          label="Number of questions you will answer"
          onChange={setWinnerCount}
        />
        <NumberInput
          value={maxVotePerUserCount}
          label="Maximum number of votes a user have"
          onChange={setMaxVotePerUserCount}
        />
        <NumberInput
          value={maxCandidateQuestionPerUserCount}
          label="Maximum number of questions a user can send"
          onChange={setMaxCandidateQuestionPerUserCount}
        />
        <DateTimeInput
          value={electionEndDate}
          label="End date of the question submissions"
          onChange={setElectionEndDate}
        />
        <DateTimeInput
          value={plannedAnswerDate}
          label="When you will answer the questions"
          onChange={setPlannedAnswerDate}
        />
      </div>
      <div>
        <button
          disabled={loading}
          onClick={() =>
            onSave({
              title,
              maxCandidateQuestionCount,
              winnerCount,
              maxVotePerUserCount,
              maxCandidateQuestionPerUserCount,
              electionEndDate,
              plannedAnswerDate,
            })
          }
        >
          Save
        </button>
        <button disabled={loading} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default withLogic([SaveLogic], CreateMeeting)
