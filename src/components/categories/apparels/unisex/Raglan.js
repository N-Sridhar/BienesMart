import React, {useEffect} from 'react';

function Raglan() {
  useEffect(() => {
    document.title = 'Raglan Full Sleeve • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>Raglan Full Sleeve</h1>
    </div>
  );
}

export default Raglan;
