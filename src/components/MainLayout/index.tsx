import React, { FC } from 'react'
import './index.scss'
import NavbarComponent from '../Navbar'
import { Row, Container, Col } from 'react-bootstrap'
import { Switch, Route, RouteComponentProps, BrowserRouter as Router } from 'react-router-dom'
import ListMeetings from '../../pages/ListMeetings'
import CreateMeeting from '../../pages/CreateMeeting'
import { Id } from '../../types'
import GetMeeting from '../../pages/GetMeeting'

const MainLayout: FC = () => (
  <div className="main">
    <Router>
      <Container fluid={true}>
        <Row className="main__header">
          <Col>
            <NavbarComponent />
          </Col>
        </Row>
        <Row className="main__body justify-content-md-center mt-5">
          <Col md="auto">
            <Switch>
              <Route exact={true} path={['/', '/meetings']} component={ListMeetings} />
              <Route exact={true} path="/meetings/new" component={CreateMeeting} />
              <Route
                exact={false}
                path="/meetings/:id"
                component={(props: RouteComponentProps<Id>) => (
                  <GetMeeting id={props.match.params.id} />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  </div>
)

export default MainLayout
