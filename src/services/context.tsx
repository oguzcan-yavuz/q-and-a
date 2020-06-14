import React, { createContext, FC, useContext } from 'react'
import services, { ServicesInterface } from './index'

const ServiceContext = createContext<ServicesInterface>(services)

type Props = {
  services?: ServicesInterface
}

export const ServiceProvider: FC<Props> = ({ services: propServices, children }) => (
  <ServiceContext.Provider value={propServices ?? services}>{children}</ServiceContext.Provider>
)

export function useServices(): ServicesInterface {
  return useContext(ServiceContext)
}
