import {
  Card,
  Table,
  Badge,
  TableFilters,
  ChoiceList,
  useFilters,
} from '../../design-components';
import { Status, Order } from '../../@types';
import { statusToBadgeStatus, getStatusLabel } from './utils';

enum FilterKey {
  Status = 'status',
  Size = 'size',
  Condition = 'condition',
  Type = 'type',
}

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const filterKeys = [
    FilterKey.Status,
    FilterKey.Size,
    FilterKey.Condition,
    FilterKey.Type,
  ];

  const { selectedFilters, handleFilterSelect } = useFilters({
    filterKeys,
  });

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          choices={[
            { label: 'Delivered', value: 'delivered' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Pending', value: 'pending' },
          ]}
          selected={selectedFilters[FilterKey.Status]}
          onChange={(event) => handleFilterSelect(FilterKey.Status, event)}
        />
      ),
    },
    {
      key: 'size',
      label: 'Size',
      filter: (
        <ChoiceList
          choices={[
            { label: '20ft', value: '20ft' },
            { label: '40ft', value: '40ft' },
            { label: '45ft', value: '45ft' },
          ]}
          selected={selectedFilters[FilterKey.Size]}
          onChange={(event) => handleFilterSelect(FilterKey.Size, event)}
        />
      ),
    },
    {
      key: 'condition',
      label: 'Condition',
      filter: (
        <ChoiceList
          choices={[
            { label: 'Cargo worthy', value: 'cargo-worthy' },
            { label: 'Wind/water tight', value: 'wind-watertight' },
            { label: 'New', value: 'new' },
          ]}
          selected={selectedFilters[FilterKey.Condition]}
          onChange={(event) => handleFilterSelect(FilterKey.Condition, event)}
        />
      ),
    },
    {
      key: 'type',
      label: 'Type',
      filter: (
        <ChoiceList
          choices={[
            { label: 'Standard', value: 'standard' },
            { label: 'High cube', value: 'high-cube' },
          ]}
          selected={selectedFilters[FilterKey.Type]}
          onChange={(event) => handleFilterSelect(FilterKey.Type, event)}
        />
      ),
    },
  ];

  return (
    <>
      <Card>
        <TableFilters filters={filters} />
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
            const {
              id,
              created,
              status,
              customer,
              sku,
              condition,
              size,
              type,
            } = order;

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
    </>
  );
}
