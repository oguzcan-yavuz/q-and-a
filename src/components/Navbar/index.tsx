import React, { FC } from 'react'
import { Navbar, Button, Nav } from 'react-bootstrap'

const NavbarComponent: FC = () => (
  <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="mr-auto" href="/">
        Q and A
      </Navbar.Brand>
      <Nav.Link href="/meetings/new">
        <Button variant="outline-info">New Session</Button>
      </Nav.Link>
    </Navbar>
  </div>
)

export default NavbarComponent
