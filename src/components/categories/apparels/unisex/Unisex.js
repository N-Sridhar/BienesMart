import React, {useEffect} from 'react';
import '../../../../styles/categories/apparels/apparels.scss';
import OptionCard from '../../OptionCard';
import Hoodies from '../../../../image/apperals/unisex/optionCards/hoodies.jpg';
import Rhalf from '../../../../image/apperals/unisex/optionCards/rhalf.jpg';
import Rfull from '../../../../image/apperals/unisex/optionCards/rfull.jpg';
import Raglan from '../../../../image/apperals/unisex/optionCards/raglan.jpg';
import {Link} from 'react-router-dom';
import {unisexPath} from '../../../Exporter';

function Unisex() {
  useEffect(() => {
    document.title = 'Unisex • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: Hoodies,
      title: 'Hoodies',
      desc: 'Hoodies short description',
      path: unisexPath['Hoodies'],
    },
    {
      img: Rhalf,
      title: 'Round Neck Half Sleeve',
      desc: 'Round Neck half sleeve short description',
      path: unisexPath['Rhalf'],
    },
    {
      img: Rfull,
      title: 'Round Neck Full Sleeve',
      desc: 'Round Neck full sleeve short description',
      path: unisexPath['Rfull'],
    },
    {
      img: Raglan,
      title: 'Raglan Full Sleeve',
      desc: 'Raglan full sleeve short description',
      path: unisexPath['Raglan'],
    },
  ];

  return (
    <div className="unisex">
      <div className="unisex_breadcrumbs user-select-none">
        • <Link to="/">Home</Link> / Unisex
      </div>
      <div className="unisex_description">
        <h2>Unisex Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="unisex_options">
        {options.map((option, i) => (
          <OptionCard
            img={option.img}
            title={option.title}
            desc={option.desc}
            path={option.path}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Unisex;
