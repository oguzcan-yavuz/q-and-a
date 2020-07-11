import { curry, defaultTo } from 'ramda'

export const resolveURL = curry((base: string, paths?: string[]): string => {
  // TODO: trim the / at the start and end?
  const pathArray = paths || []

  return [base, ...pathArray].join('/')
})

export const defaultToEmptyObject = defaultTo({})
