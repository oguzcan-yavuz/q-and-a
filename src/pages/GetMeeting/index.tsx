import React, { FC, useState, useEffect } from 'react'
import { Meeting, Id } from '../../types'
import { useServices } from '../../services/context'
import { Container, Row, Col, Image, Dropdown } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/helpers'
import { useHistory } from 'react-router-dom'

export type Props = {
  meeting: Meeting | undefined
  handleDelete: SelectCallback
}

export const useGetMeeting = (id: string): Pick<Props, 'meeting'> => {
  const [meeting, setMeeting] = useState<Meeting>()
  const { meetingService } = useServices()

  useEffect(() => {
    meetingService.getById(id).then(setMeeting)
  }, [id, meetingService])

  return { meeting }
}

export const useDeleteMeeting = (id: string): Pick<Props, 'handleDelete'> => {
  const { meetingService } = useServices()
  const history = useHistory()

  const handleDelete: SelectCallback = async () => {
    try {
      await meetingService.deleteById(id)
      history.push('/meetings')
    } catch (err) {
      alert(err)
    }
  }

  return { handleDelete }
}

export const GetMeetingPresenter: FC<Props> = ({ meeting, handleDelete }) => (
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
        <Col>
          <Dropdown>
            <Dropdown.Toggle id="get-meeting__dropdown">...</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onSelect={handleDelete}>Delete Meeting</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
    {/* TODO: list questions with their votes */}
  </div>
)

const GetMeeting: FC<Id> = ({ id }) => {
  const { meeting } = useGetMeeting(id)
  const { handleDelete } = useDeleteMeeting(id)

  return GetMeetingPresenter({
    meeting,
    handleDelete,
  })
}

export default GetMeeting
