import { MockSchedulingService, RealApiSchedulingService, type ISchedulingService } from '../lib/schedulingService';

const useRealApi = import.meta.env.VITE_API_MODE === 'real';

export const container = {
  schedulingService: (useRealApi ? new RealApiSchedulingService() : new MockSchedulingService()) as ISchedulingService,
};

export type Container = typeof container;

export type ContainerKey = keyof Container;
