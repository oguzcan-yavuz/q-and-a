import React, { FC, useState, useEffect } from 'react'
import { withLogic } from '../../utilities/with-logic'
import { Meeting } from '../../types'
import { Link } from 'react-router-dom'

type GetMeetingsProps = {
  getMeetings(): Promise<Meeting[]>
}

type Props = GetMeetingsProps

const GetMeetingsLogic = (): GetMeetingsProps => {
  // TODO: call the meeting service
  const getMeetings: GetMeetingsProps['getMeetings'] = async () => [
    {
      id: '77374755-234c-4a9a-92df-4c301fd69c97',
      title: 'first QnA',
      conditions: {
        maxCandidateQuestionCount: 50,
        maxCandidateQuestionPerUserCount: 3,
        maxVotePerUserCount: 2,
        winnerCount: 10,
      },
      electionEndDate: new Date(),
      plannedAnswerDate: new Date(),
      questions: [],
    },
    {
      id: '44eff65b-495d-4564-8d96-6481afcf57d6',
      title: 'second QnA',
      conditions: {
        maxCandidateQuestionCount: 50,
        maxCandidateQuestionPerUserCount: 3,
        maxVotePerUserCount: 2,
        winnerCount: 10,
      },
      electionEndDate: new Date(),
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
  const [currentMeetingId, setCurrentMeetingId] = useState('')

  useEffect(() => {
    getMeetings().then(setMeetings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="list-meetings">
      <h2>Active Q&A Sessions</h2>
      <ul className="list-meetings__meetings">
        {meetings.map(({ id, title }) => (
          <li key={id} onClick={() => setCurrentMeetingId(id)}>
            {title}
          </li>
        ))}
      </ul>
      <Link to={`/meetings/${currentMeetingId}`} className="badge badge-warning">
        Details
      </Link>
    </div>
  )
}

export default withLogic([GetMeetingsLogic], ListMeetings)
