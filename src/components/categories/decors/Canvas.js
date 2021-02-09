import React, {useEffect} from 'react';

function Canvas() {
  useEffect(() => {
    document.title = 'Bienes Mart 📦 • Canvas';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>Canvas Page</h1>
    </div>
  );
}

export default Canvas;
