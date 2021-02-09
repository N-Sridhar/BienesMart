import React, {useEffect} from 'react';

function Vhalf() {
  useEffect(() => {
    document.title = 'V-Neck Half Sleeves • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="vhalf">
      <h1 style={{color: 'black'}}>V Neck Half</h1>
    </div>
  );
}

export default Vhalf;
