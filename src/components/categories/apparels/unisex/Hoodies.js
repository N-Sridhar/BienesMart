import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../../../../styles/categories/apparels/options.scss';
import {apparelsPath} from '../../../Exporter';
import LazyLoad from 'react-lazyload';
import Logo from '../../../../logo.svg';
import ProductCard from '../../ProductCard';
import db, {cProducts} from '../../../../firebase';

function Hoodies() {
  useEffect(() => {
    document.title = 'Hoodies • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(true);
  const [hoodies, setHoodies] = useState([]);

  useEffect(() => {
    db.collection(cProducts)
      .doc('apparels')
      .collection('unisex')
      .onSnapshot((snap) => {
        setHoodies(
          snap.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            img: doc.data().img,
            price: doc.data().price,
          }))
        );
        setLoading(false);
      });
  }, []);

  // const importAll = (r) => r.keys().map(r);

  // const imgs = importAll(
  //   require.context('../../../../image/dummy/', false, /\.(jpg)$/)
  // );

  const SLoad = () => (
    <div style={{display: 'grid', placeItems: 'center'}}>
      <img src={Logo} alt="" style={{width: '8rem'}} />{' '}
    </div>
  );

  // const {width} = useWindowSize();

  return (
    <div className="hoodies">
      <div className="hoodies_poster">
        <img
          src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/category/catban-020201214124443.jpg?w=1536&dpr=1.3"
          alt=""
        />
      </div>
      <div className="hoodies_breadcrumbs user-select-none">
        • <Link to="/">Home</Link> /{' '}
        <Link to={apparelsPath['Unisex']}>Unisex</Link> / Hoodies
      </div>
      <div className="hoodies_description">
        <h2>Hoodies</h2>
        {loading && <h3>Loading...</h3>}
      </div>
      <div className="hoodies_products">
        {hoodies
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((hoody, i) => (
            <LazyLoad
              once={true}
              height="100%"
              offset={[-200, 200]}
              placeholder={<SLoad />}
              key={i}
            >
              <ProductCard
                img={hoody?.img}
                name={hoody?.name}
                price={hoody?.price}
              />
            </LazyLoad>
          ))}
      </div>
    </div>
  );
}

export default Hoodies;
