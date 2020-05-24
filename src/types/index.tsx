type Question = {
  value: string
}

export type Conditions = {
  maxCandidateQuestionCount: number
  winnerCount: number
  maxVotePerUserCount: number
  maxCandidateQuestionPerUserCount: number
}

export type Meeting = {
  id: string
  title: string
  image?: string
  conditions: Conditions
  electionEndDate: Date
  plannedAnswerDate: Date
  questions?: Question[]
}

// TODO: separate them when it gets messy
export type Body<T> = Omit<T, 'id'>

export type Id = {
  id: string
}

export type Pagination = {
  limit: number
  offset: number
}

export type Sort<T> = {
  sortBy: keyof T
  orderBy: 'DESC' | 'ASC'
}

export type Query<T> = {
  filters?: Body<T>
  pagination?: Pagination
  sort?: Sort<Body<T>>
}
