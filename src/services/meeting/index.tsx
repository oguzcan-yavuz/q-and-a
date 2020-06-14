import { Meeting } from '../../types'
import { CrudHTTPClient, CrudHTTPClientInterface } from '../crud-http-client'

export interface MeetingServiceInterface extends CrudHTTPClientInterface<Meeting> {}

export class MeetingService extends CrudHTTPClient<Meeting> implements MeetingServiceInterface {
  constructor() {
    const path = 'meetings'
    super(path)
  }
}
