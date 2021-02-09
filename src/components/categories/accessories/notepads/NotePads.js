import React, {useEffect} from 'react';
import '../../../../styles/categories/accessories/accessories.scss';
import OptionCard from '../../OptionCard';

function NotePads() {
  useEffect(() => {
    document.title = 'NotePads • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: '',
      title: 'Ruled',
      desc: 'Ruled short description',
      path: '/notepads/ruled',
    },
    {
      img: '',
      title: 'Un-Ruled',
      desc: 'Un-Ruled short description',
      path: '/notepads/unruled',
    },
  ];

  return (
    <div className="notepads">
      <div className="notepads_description">
        <h2>Notepads Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="notepads_options">
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

export default NotePads;
