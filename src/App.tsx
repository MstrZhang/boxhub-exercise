import { useState, useEffect } from 'react';
import { Order } from './@types/Order';
import { OrdersTable } from './components';
import { sortByDate } from './utils/utilities';

// for demonstration: in a production environment we would be reading from an actual API
const MOCK_API_URL = 'src/assets/orders.json';

function App() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(MOCK_API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data: { orders: Order[] }) => {
        // ideally there would be a query parameter to query this from the backend
        // so the frontend wouldn't have to sort this on the client side
        setOrders(data.orders.sort(sortByDate));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="overflow-x lg:container">
        <OrdersTable orders={orders} />
      </div>
      {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
    </>
  );
}

export default App;
