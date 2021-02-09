import React, {useEffect} from 'react';

function Rfull() {
  useEffect(() => {
    document.title = 'RoundNeck Full Sleeve • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>Round Neck Full Sleeve</h1>
    </div>
  );
}

export default Rfull;
