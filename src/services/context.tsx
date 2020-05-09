import React, {createContext, FC, useContext} from 'react';
import services from './index';

type Services = typeof services;

const ServiceContext = createContext<Services>(services);

type Props = {
    services?: Services;
};

export const ServiceProvider: FC<Props> = ({ services: propServices, children}) => (
    <ServiceContext.Provider value={propServices ?? services}>{children}</ServiceContext.Provider>
);

export function useServices(): Services {
    return useContext(ServiceContext);
};
