import React, {useEffect} from 'react';

function PhotoFrames() {
  useEffect(() => {
    document.title = 'Bienes Mart 📦 • PhotoFrames';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 style={{color: 'black'}}>PhotoFrames Page</h1>
    </div>
  );
}

export default PhotoFrames;
