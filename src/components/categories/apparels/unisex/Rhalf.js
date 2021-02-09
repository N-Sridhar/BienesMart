import React, {useEffect} from 'react';

function Rhalf() {
  useEffect(() => {
    document.title = 'RoundNeck Half Sleeve • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>Round Neck Half Sleeve</h1>
    </div>
  );
}

export default Rhalf;
