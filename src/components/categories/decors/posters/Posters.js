import React, {useEffect} from 'react';
import '../../../../styles/categories/decors/decors.scss';
import OptionCard from '../../OptionCard';

function Posters() {
  useEffect(() => {
    document.title = 'Posters • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: '',
      title: 'Role',
      desc: 'Role short description',
      path: '/posters/role',
    },
    {
      img: '',
      title: 'Frame',
      desc: 'Frame short description',
      path: '/posters/frame',
    },
  ];

  return (
    <div className="posters">
      <div className="posters_description">
        <h2>Posters Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="posters_options">
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

export default Posters;
