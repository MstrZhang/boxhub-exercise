// for demonstration:
// normally, i would import these from a separate / pre-existing design system package
// for the purposes of this project, i am building them from scratch
import { Card, Table, Badge } from '../../design-components';
import { Status, Order } from '../../@types';
import { statusToBadgeStatus, getStatusLabel } from './utils';

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Card>
      <Table
        headings={[
          { title: 'ID' },
          { title: 'Created' },
          { title: 'Status' },
          { title: 'Customer' },
          { title: 'SKU' },
          { title: 'Condition' },
          { title: 'Size' },
          { title: 'Type' },
        ]}
      >
        {orders.map((order: Order) => {
          const { id, created, status, customer, sku, condition, size, type } =
            order;

          return (
            <Table.Row key={id} highlighted={order.status === Status.Pending}>
              <Table.Cell className="font-semibold">{id}</Table.Cell>
              <Table.Cell>{new Date(created).toDateString()}</Table.Cell>
              <Table.Cell>
                <Badge status={statusToBadgeStatus(status)}>
                  {getStatusLabel(status as Status)}
                </Badge>
              </Table.Cell>
              <Table.Cell>{customer}</Table.Cell>
              <Table.Cell>{sku}</Table.Cell>
              <Table.Cell>{condition}</Table.Cell>
              <Table.Cell>{size}</Table.Cell>
              <Table.Cell>{type}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table>
    </Card>
  );
}
