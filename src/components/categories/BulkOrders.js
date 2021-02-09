import React, {useEffect} from 'react';

function BulkOrders() {
  useEffect(() => {
    document.title = 'Bienes Mart 📦 • Bulk Orders';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>Bulk Orders</h1>
    </div>
  );
}

export default BulkOrders;
