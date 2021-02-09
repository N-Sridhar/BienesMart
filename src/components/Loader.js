import React from 'react';
import '../styles/Loader.scss';

import logoInner from '../image/logo/logo_inner.svg';
import logoOuter from '../image/logo/logo_outer.svg';

function Loader() {
  return (
    <div className="loader">
      <div className="container">
        <img src={logoOuter} alt="outer" className="outer" />
        <img src={logoInner} alt="inner" className="inner" />
      </div>
    </div>
  );
}

export default Loader;
