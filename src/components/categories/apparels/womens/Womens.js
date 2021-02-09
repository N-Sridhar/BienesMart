import React, {useEffect} from 'react';
import '../../../../styles/categories/apparels/apparels.scss';
import OptionCard from '../../OptionCard';
import Ctop from '../../../../image/apperals/womens/optionCards/ctop.jpg';
import Ttop from '../../../../image/apperals/womens/optionCards/ttop.jpg';
import Ltop from '../../../../image/apperals/womens/optionCards/ltop.jpg';
import Mtop from '../../../../image/apperals/womens/optionCards/mtop.jpg';
import Allover from '../../../../image/apperals/womens/optionCards/allover.jpg';
import {Link} from 'react-router-dom';

function Womens() {
  useEffect(() => {
    document.title = 'Womens • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: Ctop,
      title: 'Crop Top',
      desc: 'Crop top short description',
      path: '/womens/ctop',
    },
    {
      img: Ttop,
      title: 'Tank Top',
      desc: 'Tank Top short description',
      path: '/womens/ttop',
    },
    {
      img: Ltop,
      title: 'Long Top',
      desc: 'Long Top short description',
      path: '/womens/ltop',
    },
    {
      img: Mtop,
      title: 'Maternity Top',
      desc: 'Maternity Top short description',
      path: '/womens/mtop',
    },
    {
      img: Allover,
      title: 'All Over Print',
      desc: 'All over print short description',
      path: '/womens/allover',
    },
  ];

  return (
    <div className="womens">
      <div className="unisex_breadcrumbs">
        • <Link to="/">Home</Link> / Womens
      </div>
      <div className="womens_description">
        <h2>Womens Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="womens_options">
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

export default Womens;
