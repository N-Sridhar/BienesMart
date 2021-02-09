import React, {useEffect} from 'react';

function PopGrips() {
  useEffect(() => {
    document.title = 'PopGrips • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>PopGrips Page</h1>
    </div>
  );
}

export default PopGrips;
