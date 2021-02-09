import React, {useEffect} from 'react';
import '../../../../styles/categories/decors/decors.scss';
import OptionCard from '../../OptionCard';

function DreamCatchers() {
  useEffect(() => {
    document.title = 'DreamCatchers • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const options = [
    {
      img: '',
      title: 'Acrylic',
      desc: 'Acrylic short description',
      path: '/dreamcatchers/acrylic',
    },
    {
      img: '',
      title: 'Cluster',
      desc: 'Cluster short description',
      path: '/dreamcatchers/cluster',
    },
    {
      img: '',
      title: 'Car Hanging',
      desc: 'Car Hanging short description',
      path: '/dreamcatchers/carHanging',
    },
    {
      img: '',
      title: 'Crochet',
      desc: 'Crochet short description',
      path: '/dreamcatchers/crochet',
    },
  ];

  return (
    <div className="dreamcatchers">
      <div className="dreamcatchers_description">
        <h2>Dreamcatchers Collections</h2>
        <h4>Short one line note</h4>
      </div>
      <div className="dreamcatchers_options">
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

export default DreamCatchers;
