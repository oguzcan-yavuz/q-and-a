import { MeetingService, MeetingServiceInterface } from './meeting'

export interface ServicesInterface {
  meetingService: MeetingServiceInterface
}

export default {
  meetingService: new MeetingService(),
}
