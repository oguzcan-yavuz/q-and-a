import { Meeting } from '../../types'
import { CrudHTTPClient } from '../crud-http-client'

export class MeetingService extends CrudHTTPClient<Meeting> {
  constructor() {
    const path = 'meetings'
    super(path)
  }
}
