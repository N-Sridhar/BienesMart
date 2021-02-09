import React, {useEffect} from 'react';
import '../../../../styles/categories/accessories/accessories.scss';
import OptionCard from '../../OptionCard';

function Coasters() {
  useEffect(() => {
    document.title = 'Coasters • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: '',
      title: 'Circle',
      desc: 'Circle short description',
      path: '/coasters/circle',
    },
    {
      img: '',
      title: 'Square',
      desc: 'Square short description',
      path: '/coasters/square',
    },
  ];

  return (
    <div className="coasters">
      <div className="coasters_description">
        <h2>Coasters Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="coasters_options">
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

export default Coasters;
