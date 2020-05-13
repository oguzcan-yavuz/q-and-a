import React, { FC, useState, useEffect } from 'react'
import { withLogic } from '../../utilities/with-logic'
import { Meeting } from '../../types'

type GetMeetingsProps = {
  getMeetings(): Promise<Meeting[]>
}

type Props = GetMeetingsProps

const GetActiveMeetingsLogic = (): GetMeetingsProps => {
  // TODO: call the meeting service
  const getMeetings = async (): Promise<Meeting[]> => [
    {
      title: 'first q&a',
      maxCandidateQuestionCount: 50,
      maxCandidateQuestionPerUserCount: 3,
      maxVotePerUserCount: 2,
      electionEndDate: new Date(),
      winnerCount: 10,
      plannedAnswerDate: new Date(),
      questions: [],
    },
    {
      title: 'second q&a',
      maxCandidateQuestionCount: 50,
      maxCandidateQuestionPerUserCount: 3,
      maxVotePerUserCount: 2,
      electionEndDate: new Date(),
      winnerCount: 10,
      plannedAnswerDate: new Date(),
      questions: [],
    },
  ]

  return {
    getMeetings,
  }
}

const ListMeetings: FC<Props> = ({ getMeetings }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([])

  useEffect(() => {
    getMeetings().then(setMeetings)
  }, [getMeetings])

  return (
    <div className="list-meetings">
      <h2>Active Q&A Sessions</h2>
      <ul className="list-meetings__meetings">
        {meetings.map((meeting) => (
          <li key={meeting.title}>meeting</li>
        ))}
      </ul>
    </div>
  )
}

export default withLogic([GetActiveMeetingsLogic], ListMeetings)
