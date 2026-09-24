import { useContext } from 'react';
import { DiContext, type ContainerKey } from '../providers/DependencyProvider';

/** Hook de DI — componentes nunca instanciam serviços diretamente. */
export function useDi<T>(key: ContainerKey): T {
  return useContext(DiContext)[key] as unknown as T;
}
