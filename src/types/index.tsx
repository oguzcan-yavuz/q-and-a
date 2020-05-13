type Question = {
  value: string
}

export type Meeting = {
  title: string
  maxCandidateQuestionCount: number
  winnerCount: number
  maxVotePerUserCount: number
  maxCandidateQuestionPerUserCount: number
  electionEndDate: Date
  plannedAnswerDate: Date
  questions?: Question[]
}
