import React, { FC, useState, useEffect } from 'react'
import { Meeting } from '../../types'
import { withLogic } from '../../utilities/with-logic'

type GetMeetingProps = {
  getMeeting(id: string): Promise<Meeting>
}

type Params = {
  id: string
}

type Props = Params & GetMeetingProps

const GetMeetingLogic = (): GetMeetingProps => {
  // TODO: call the meeting service
  const getMeeting: GetMeetingProps['getMeeting'] = async (id) => {
    const meetings: Meeting[] = [
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

    return meetings.find((meeting) => meeting.id === id) as Meeting
  }

  return {
    getMeeting,
  }
}

const GetMeeting: FC<Props> = ({ id, getMeeting }) => {
  const [meeting, setMeeting] = useState<Meeting>()

  useEffect(() => {
    getMeeting(id).then(setMeeting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return <div className="get-meeting">{meeting && <p>{meeting.title}</p>}</div>
}

export default withLogic([GetMeetingLogic], GetMeeting)
