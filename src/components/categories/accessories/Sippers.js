import React, {useEffect} from 'react';

function SipperBottles() {
  useEffect(() => {
    document.title = 'Bienes Mart 📦 • SipperBottles';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>SipperBottles Page</h1>
    </div>
  );
}

export default SipperBottles;
