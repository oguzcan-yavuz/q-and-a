import React, { FC, useState, useEffect } from 'react'
import { withLogic } from '../../utilities/with-logic'
import { Meeting, Query } from '../../types'
import { Link } from 'react-router-dom'
import { useServices } from '../../services/context'

type GetMeetingsProps = {
  getMeetings(query: Query<Meeting>): Promise<Meeting[]>
}

type Props = GetMeetingsProps

const GetMeetingsLogic = (): GetMeetingsProps => {
  const { meetingService } = useServices()

  const getMeetings: GetMeetingsProps['getMeetings'] = async (query) => {
    const meetings = await meetingService.getMany(query)

    return meetings
  }

  return {
    getMeetings,
  }
}

const ListMeetings: FC<Props> = ({ getMeetings }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [currentMeetingId, setCurrentMeetingId] = useState('')

  useEffect(() => {
    getMeetings({}).then(setMeetings)
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
