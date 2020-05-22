import React, { FC, useState, useEffect } from 'react'
import { Meeting } from '../../types'
import { withLogic } from '../../utilities/with-logic'
import { useServices } from '../../services/context'

type GetMeetingProps = {
  getMeeting(id: string): Promise<Meeting>
}

type Params = {
  id: string
}

type Props = Params & GetMeetingProps

const GetMeetingLogic = (): GetMeetingProps => {
  const { meetingService } = useServices()

  const getMeeting: GetMeetingProps['getMeeting'] = async (id) => {
    const meeting = await meetingService.getById(id)

    return meeting
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
