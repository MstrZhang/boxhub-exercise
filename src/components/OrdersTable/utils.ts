import { Status, StatusLabel } from '../../@types/Status';

export const statusToBadgeStatus = (status?: string) => {
  switch (status) {
    case Status.Delivered:
      return 'success';
    case Status.InProgress:
      return 'attention';
    case Status.Pending:
      return 'warning';
  }
};

export const getStatusLabel = (status: Status) => {
  return StatusLabel[status];
}
