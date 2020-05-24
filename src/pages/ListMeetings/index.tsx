import React, { FC, useState, useEffect } from 'react'
import { withLogic } from '../../utilities/with-logic'
import { Meeting, Query } from '../../types'
import { Link } from 'react-router-dom'
import { useServices } from '../../services/context'
import { Card, Button } from 'react-bootstrap'

type GetMeetingsProps = {
  getMeetings(query: Query<Meeting>): Promise<Meeting[]>
}

type Props = GetMeetingsProps

const GetMeetingsLogic = (): GetMeetingsProps => {
  const { meetingService } = useServices()

  return {
    getMeetings: meetingService.getMany,
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
      {meetings.map(({ id, title }) => (
        <Card
          key={id}
          className="list-meetings__meeting mb-5"
          onMouseOver={() => setCurrentMeetingId(id)}
        >
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </Card.Text>
            <Link to={`/meetings/${currentMeetingId}`}>
              <Button variant="primary">Details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default withLogic([GetMeetingsLogic], ListMeetings)
