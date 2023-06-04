import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Badge,
  TableFilters,
  ChoiceList,
  Thumbnail,
  Map,
  Popover,
  useFilters,
} from '../../design-components';
import { Status, Order } from '../../@types';
import { MapTrifold } from '@phosphor-icons/react';
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
  const [openPopovers, setOpenPopovers] = useState<boolean[]>([]);

  useEffect(() => {
    setOpenPopovers(Array(orders.length).fill(false));
  }, [orders]);

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
            { title: 'Photo' },
            { title: 'Created' },
            { title: 'Status' },
            { title: 'Customer' },
            { title: 'SKU' },
            { title: 'Condition' },
            { title: 'Size' },
            { title: 'Type' },
            { title: 'Map' },
          ]}
        >
          {orders.map((order: Order, index: number) => {
            const {
              id,
              created,
              status,
              customer,
              sku,
              condition,
              size,
              type,
              // photo is broken so being ommitted for now
              origin_address: originAddress,
              shipping_address: shippingAddress,
            } = order;

            const mapActivator = (index: number) => {
              return (
                <button
                  className="rounded text-blue-600 focus:ring-2"
                  onClick={() =>
                    setOpenPopovers((prevState) => {
                      const copy = Array.from(prevState);
                      return copy.map(
                        (popover: boolean, popoverIndex: number) => {
                          if (popoverIndex === index) {
                            return !popover;
                          } else {
                            return false;
                          }
                        }
                      );
                    })
                  }
                >
                  <MapTrifold size={24} />
                </button>
              );
            };

            return (
              <Table.Row key={id} highlighted={order.status === Status.Pending}>
                <Table.Cell className="font-semibold">{id}</Table.Cell>
                <Table.Cell>
                  {/* image URL from orders.json is broken */}
                  <Thumbnail url={'https://picsum.photos/200'} alt={id} />
                </Table.Cell>
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
                <Table.Cell>
                  <Popover
                    active={openPopovers[index]}
                    title={`#${id}`}
                    activator={mapActivator(index)}
                  >
                    <Map
                      originAddress={originAddress}
                      shippingAddress={shippingAddress}
                    />
                  </Popover>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table>
      </Card>
    </>
  );
}
