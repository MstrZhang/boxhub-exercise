export enum Status {
  Delivered = 'delivered',
  InProgress = 'in-progress',
  Pending = 'pending',
};

export const StatusLabel = {
  [Status.Delivered]: 'Delivered',
  [Status.InProgress]: 'In Progress',
  [Status.Pending]: 'Pending',
};
