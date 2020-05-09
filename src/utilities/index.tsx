export const appendTwoDotsAndSpace = (str: string): string => `${str}: `

export const toISOStringWithoutTimezone = (date: Date): string => {
  const isoStr = date.toISOString()

  return isoStr.slice(0, isoStr.length - 1)
}
