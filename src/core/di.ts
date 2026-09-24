import { MockSchedulingService, type ISchedulingService } from '../lib/schedulingService';

/** Container de Injeção de Dependência (ver REACT.md) */
export const container = {
  schedulingService: new MockSchedulingService() as ISchedulingService,
};

export type ContainerKey = keyof typeof container;
