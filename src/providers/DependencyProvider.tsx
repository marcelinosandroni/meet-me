import { createContext } from 'react';
import { container, type Container } from '../core/di';

export const DiContext = createContext(container);

export function DependencyProvider({ children }: { children: React.ReactNode }) {
  return <DiContext.Provider value={container}>{children}</DiContext.Provider>;
}

export type ContainerKey = keyof Container;
