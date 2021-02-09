import React, {useEffect} from 'react';

function MousePads() {
  useEffect(() => {
    document.title = 'Bienes Mart 📦 • MousePads';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>MousePads Page</h1>
    </div>
  );
}

export default MousePads;
