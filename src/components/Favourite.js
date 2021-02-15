import React from 'react';
import {useSelector} from 'react-redux';
import {getFav} from '../app/redux/favSlice';
import '../styles/Favourite.scss';
import EmptyBox from '../image/indicaters/iconfinder_Box_Empty_52634.png';
import ProductCard from './categories/ProductCard';

function Favourite() {
  const favourites = useSelector(getFav);

  return (
    <div className="favourite">
      {favourites.length === 0 && (
        <div className="favourite_empty">
          <img src={EmptyBox} alt="" />
          <h2>Your favourite's box is empty!</h2>
        </div>
      )}
      {favourites.length >= 1 && (
        <div className="favourite_products">
          {favourites.map((fav, i) => (
            <ProductCard
              id={fav.id}
              img={fav.img}
              name={fav.name}
              price={fav.price}
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourite;
