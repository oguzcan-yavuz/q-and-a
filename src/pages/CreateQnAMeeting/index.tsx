import React, { useState } from 'react'
import TitleInput from '../../components/Inputs/TitleInput'
import NumberInput from '../../components/Inputs/NumberInput'
import DateInput from '../../components/Inputs/DateTimeInput'

type QnAMeetingData = {
  title: string
  maxCandidateQuestionCount: number
  winnerCount: number
  maxVotePerUserCount: number
  maxCandidateQuestionPerUserCount: number
  electionEndDate: Date
  plannedAnswerDate: Date
}

const CreateQnAMeeting = () => {
  const [title, setTitle] = useState('')
  const [maxCandidateQuestionCount, setMaxCandidateQuestionCount] = useState(0)
  const [winnerCount, setWinnerCount] = useState(0)
  const [maxVotePerUserCount, setMaxVotePerUserCount] = useState(0)
  const [maxCandidateQuestionPerUserCount, setMaxCandidateQuestionPerUserCount] = useState(0)
  const [electionEndDate, setElectionEndDate] = useState(new Date())
  const [plannedAnswerDate, setPlannedAnswerDate] = useState(new Date())
  const [loading, setLoading] = useState(false)

  const reset = () => {
    setTitle('')
    setMaxCandidateQuestionCount(0)
    setWinnerCount(0)
    setMaxVotePerUserCount(0)
    setMaxCandidateQuestionPerUserCount(0)
    setElectionEndDate(new Date())
    setPlannedAnswerDate(new Date())
  }

  const onSave = async (data: QnAMeetingData) => {
    console.log('on save data:', data)
    setLoading(true)
    // TODO: call the meeting service
    setLoading(false)
  }

  return (
    <div>
      <div>
        <TitleInput value={title} onChange={setTitle} />
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
        <DateInput
          value={electionEndDate}
          label="End date of the question submissions"
          onChange={setElectionEndDate}
        />
        <DateInput
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

export default CreateQnAMeeting
