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
  const getMeeting: GetMeetingProps['getMeeting'] = async (id) => ({
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
  })

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
