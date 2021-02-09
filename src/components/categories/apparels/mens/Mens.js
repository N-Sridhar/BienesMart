import React, {useEffect} from 'react';
import '../../../../styles/categories/apparels/apparels.scss';
import OptionCard from '../../OptionCard';
import Vhalf from '../../../../image/apperals/mens/optionCards/vhalf.jpg';
import Vfull from '../../../../image/apperals/mens/optionCards/vfull.jpg';
import Polo from '../../../../image/apperals/mens/optionCards/polo.jpg';
import AllOver from '../../../../image/apperals/mens/optionCards/allover.jpg';
import GymVest from '../../../../image/apperals/mens/optionCards/sleeveless.jpg';
import {Link} from 'react-router-dom';

function Mens() {
  useEffect(() => {
    document.title = 'Mens • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: Vhalf,
      title: 'V Neck Half Sleeve',
      desc: 'V Neck half sleeve short description',
      path: '/mens/vhalf',
    },
    {
      img: Vfull,
      title: 'V Neck Full Sleeve',
      desc: 'V Neck full sleeve short description',
      path: '/mens/vfull',
    },
    {
      img: Polo,
      title: 'Polo',
      desc: 'Polo short description',
      path: '/mens/polo',
    },
    {
      img: AllOver,
      title: 'All Over Print',
      desc: 'all over print short description',
      path: '/mens/allover',
    },
    {
      img: GymVest,
      title: 'Gym Vest',
      desc: 'Gym Vest short description',
      path: '/mens/gymvest',
    },
  ];

  return (
    <div className="mens">
      <div className="mens_breadcrumbs">
        • <Link to="/">Home</Link> / Mens
      </div>
      <div className="mens_description">
        <h2>Mens Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="mens_options">
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

export default Mens;
