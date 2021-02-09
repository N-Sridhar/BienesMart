import React, {useEffect} from 'react';
import '../../../../styles/categories/apparels/apparels.scss';
import OptionCard from '../../OptionCard';
import Boys from '../../../../image/apperals/kids/optionCards/boys.jpg';
import Girls from '../../../../image/apperals/kids/optionCards/girls.jpg';
import Babies from '../../../../image/apperals/kids/optionCards/babies.jpg';
import {Link} from 'react-router-dom';

function Kids() {
  useEffect(() => {
    document.title = 'Kids • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: Boys,
      title: 'Boys',
      desc: 'Boys short description',
      path: '/kids/boys',
    },
    {
      img: Girls,
      title: 'Girls',
      desc: 'Girls short description',
      path: '/kids/girls',
    },
    {
      img: Babies,
      title: 'Babies',
      desc: 'Babies short description',
      path: '/kids/babies',
    },
  ];

  return (
    <div className="kids">
      <div className="unisex_breadcrumbs">
        • <Link to="/">Home</Link> / Kids
      </div>
      <div className="kids_description">
        <h2>Kids Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="kids_options">
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

export default Kids;
