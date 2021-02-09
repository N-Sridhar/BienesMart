import React, {useEffect} from 'react';
import '../../../../styles/categories/accessories/accessories.scss';
import OptionCard from '../../OptionCard';

function Mugs() {
  useEffect(() => {
    document.title = 'Mugs • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: '',
      title: 'Colour',
      desc: 'Colour short description',
      path: '/mugs/colour',
    },
    {
      img: '',
      title: 'Magic',
      desc: 'Magic short description',
      path: '/mugs/magic',
    },
  ];

  return (
    <div className="mugs">
      <div className="mugs_description">
        <h2>Mugs Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="mugs_options">
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

export default Mugs;
