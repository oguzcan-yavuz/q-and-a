import { curry } from 'ramda'

export const appendTwoDotsAndSpace = (str: string): string => `${str}: `

export const datePreciseToMinutes = (date: Date): Date =>
  new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      0
    )
  )

export const resolveURL = curry((base: string, paths?: string[]): string => {
  // TODO: trim the / at the start and end?
  const pathArray = paths || []

  return [base, ...pathArray].join('/')
})
