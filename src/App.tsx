import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Order } from './@types/Order';
import { OrdersTable } from './components';
import { sortByDate } from './utils/utilities';

// for demonstration: in a production environment we would be reading from an actual API
const MOCK_API_URL = 'src/assets/orders.json';

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchParams, _] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    fetch(MOCK_API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data: { orders: Order[] }) => {
        // ideally there would be a way to supply query parameters to the backend
        // (e.g. sorting, search, filtering, etc ...)
        // so the frontend wouldn't have to sort this on the client side
        let result = data.orders.sort(sortByDate);

        searchParams.forEach((value: string, key: string) => {
          switch (key) {
            case 'status':
              result = result.filter((order: Order) =>
                value.split(',').includes(order.status)
              );
              break;
            case 'condition':
              result = result.filter((order: Order) =>
                value.split(',').includes(order.condition)
              );
              break;
            case 'size':
              result = result.filter((order: Order) =>
                value.split(',').includes(order.size)
              );
              break;
            case 'type':
              result = result.filter((order: Order) =>
                value.split(',').includes(order.type)
              );
              break;
            default:
              null;
          }
        });

        setOrders(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location]);

  return (
    <>
      <div className="overflow-x lg:container">
        <OrdersTable orders={orders} />
      </div>
    </>
  );
}

export default App;
