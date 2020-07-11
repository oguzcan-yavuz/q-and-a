import React, { FC, useState, useEffect } from 'react'
import { Meeting, Dispatcher } from '../../types'
import { Link } from 'react-router-dom'
import { useServices } from '../../services/context'
import { Card, Button } from 'react-bootstrap'

export type Props = {
  meetings: Meeting[]
  setCurrentMeetingId: Dispatcher<string>
  LinkToMeetingWrapper: FC
}

export const useGetMeetings = (): Pick<Props, 'meetings'> => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const { meetingService } = useServices()

  useEffect(() => {
    meetingService.getMany({}).then(setMeetings)
  }, [meetingService])

  return { meetings }
}

export const useCurrentMeeting = (): Pick<
  Props,
  'setCurrentMeetingId' | 'LinkToMeetingWrapper'
> => {
  const [currentMeetingId, setCurrentMeetingId] = useState<string>('')

  const LinkToMeetingWrapper: FC = ({ children }) => (
    <Link to={`meetings/${currentMeetingId}`}>{children}</Link>
  )

  return { setCurrentMeetingId, LinkToMeetingWrapper }
}

export const ListMeetingsPresenter: FC<Props> = ({
  meetings,
  setCurrentMeetingId,
  LinkToMeetingWrapper,
}) => (
  <div className="list-meetings">
    {meetings.map(({ id, title, image }) => (
      <Card
        key={id}
        className="list-meetings__meeting mb-5"
        onMouseOver={() => setCurrentMeetingId(id)}
      >
        <div className="embed-responsive embed-responsive-4by3">
          <Card.Img className="embed-responsive-item" variant="top" src={image} />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </Card.Text>
          <LinkToMeetingWrapper>
            <Button variant="primary">Details</Button>
          </LinkToMeetingWrapper>
        </Card.Body>
      </Card>
    ))}
  </div>
)

const ListMeetings: FC = () => {
  const { meetings } = useGetMeetings()
  const { setCurrentMeetingId, LinkToMeetingWrapper } = useCurrentMeeting()

  return ListMeetingsPresenter({ meetings, setCurrentMeetingId, LinkToMeetingWrapper })
}

export default ListMeetings
