import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/categories/OptionCard.scss';

function OptionCard({img, title, desc, path}) {
  return (
    <div className="optionCard">
      <Link to={path}>
        <img src={img} alt="🔄 Please reload the site ❗" />
        <h3>{title}</h3>
        <h5>{desc}</h5>
      </Link>
    </div>
  );
}

export default OptionCard;
