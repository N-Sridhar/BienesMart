import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Footer.scss';

function Footer() {
  return (
    <div className="footer">
      {/* <h1>Footer</h1> */}
      <Link to="/terms">
        <h3>Terms and Conditions</h3>
      </Link>
      <h4>© 2021 Bienesmart. All rights reserved.</h4>
    </div>
  );
}

export default Footer;
