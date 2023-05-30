import { useState, useEffect } from 'react';
import { Order } from './@types/Order';

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
        setOrders(data.orders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </>
  );
}

export default App;
