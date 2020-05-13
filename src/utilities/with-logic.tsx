import { FC } from 'react'

type LogicFunc<T = {}> = (...args: any[]) => T
type OmittedProps<T = {}, U = {}> = Omit<U, keyof T> & Partial<T>

export const withLogic = <T, U>(
  logicFunctions: LogicFunc<T>[],
  component: FC<U>
): FC<OmittedProps<T, U>> => (props: OmittedProps<T, U>) => {
  const extraProps = logicFunctions.reduce(
    (extras, logicFunction) => ({ ...extras, ...logicFunction() }),
    {}
  )
  const allProps = { ...extraProps, ...props } as any

  return component(allProps)
}
