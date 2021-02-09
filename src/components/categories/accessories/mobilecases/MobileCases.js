import React, {useEffect} from 'react';
import '../../../../styles/categories/accessories/accessories.scss';
import OptionCard from '../../OptionCard';

function MobileCases() {
  useEffect(() => {
    document.title = 'MobileCases • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: '',
      title: 'UV Cases',
      desc: 'UV Cases short description',
      path: '/mobilecases/uv',
    },
    {
      img: '',
      title: 'Neon Cases',
      desc: 'Neon Cases short description',
      path: '/mobilecases/neon',
    },
  ];

  return (
    <div className="mobilecases">
      <div className="mobilecases_description">
        <h2>Mobilecases Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="mobilecases_options">
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

export default MobileCases;
