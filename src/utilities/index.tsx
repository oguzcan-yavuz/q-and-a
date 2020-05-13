export const appendTwoDotsAndSpace = (str: string): string => `${str}: `

export const toLocalISOTime = (date: Date): string => {
  const tzOffset = new Date().getTimezoneOffset() * 60000
  const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, -1)

  return localISOTime
}
