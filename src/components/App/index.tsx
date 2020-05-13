import React from 'react'
import MainLayout from '../MainLayout'
import CreateMeeting from '../../pages/CreateMeeting'
import ListMeetings from '../../pages/ListMeetings'

function App() {
  return (
    <MainLayout>
      <CreateMeeting />
      <ListMeetings />
    </MainLayout>
  )
}

export default App
