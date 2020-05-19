import React, { FC } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import ListMeetings from '../../pages/ListMeetings'
import CreateMeeting from '../../pages/CreateMeeting'
import GetMeeting from '../../pages/GetMeeting'

const Navbar: FC = () => (
  <Router>
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Q and A
        </a>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={'/meetings/new'} className="nav-link">
              Create a Q&A session
            </Link>
          </li>
        </div>
      </nav>
    </div>

    <div>
      <Switch>
        <Route exact={true} path={['/', '/meetings']} component={ListMeetings} />
        <Route exact={true} path="/meetings/new" component={CreateMeeting} />
        <Route exact={false} path="/meetings/:id" component={GetMeeting} />
      </Switch>
    </div>
  </Router>
)

export default Navbar
