import React, { FC, useState, useEffect } from 'react'
import { Meeting, Id } from '../../types'
import { withLogic } from '../../utilities/with-logic'
import { useServices } from '../../services/context'
import { Container, Row, Col, Image } from 'react-bootstrap'

type GetMeetingProps = {
  getMeeting(id: string): Promise<Meeting>
}

type Props = Id & GetMeetingProps

const GetMeetingLogic = (): GetMeetingProps => {
  const { meetingService } = useServices()

  return {
    getMeeting: meetingService.getById,
  }
}

const GetMeeting: FC<Props> = ({ id, getMeeting }) => {
  const [meeting, setMeeting] = useState<Meeting>()

  useEffect(() => {
    getMeeting(id).then(setMeeting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="get-meeting">
      <Container>
        <Row>
          <Col>
            <Image src={meeting?.image} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>{meeting?.title}</h6>
          </Col>
        </Row>
      </Container>
      {/* TODO: list questions with their votes */}
    </div>
  )
}

export default withLogic([GetMeetingLogic], GetMeeting)
