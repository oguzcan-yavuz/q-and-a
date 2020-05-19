type Question = {
  value: string
}

export type Meeting = {
  id: string
  title: string
  conditions: {
    maxCandidateQuestionCount: number
    winnerCount: number
    maxVotePerUserCount: number
    maxCandidateQuestionPerUserCount: number
  }
  electionEndDate: Date
  plannedAnswerDate: Date
  questions?: Question[]
}

export type MeetingBody = Omit<Meeting, 'id'>
