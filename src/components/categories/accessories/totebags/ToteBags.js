import React, {useEffect} from 'react';
import '../../../../styles/categories/accessories/accessories.scss';
import OptionCard from '../../OptionCard';

function ToteBags() {
  useEffect(() => {
    document.title = 'ToteBags • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: '',
      title: 'All-Over Print',
      desc: 'All-Over Print short description',
      path: '/totebags/allover',
    },
    {
      img: '',
      title: 'Zipper',
      desc: 'Zipper short description',
      path: '/totebags/zipper',
    },
    {
      img: '',
      title: 'Non-Zipper',
      desc: 'Non-Zipper short description',
      path: '/totebags/nonzipper',
    },
  ];

  return (
    <div className="totebags">
      <div className="totebags_description">
        <h2>Totebags Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="totebags_options">
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

export default ToteBags;
