import React, {useState} from 'react';
import '../../styles/categories/ProductCard.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {IconButton} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import {useWindowSize} from 'react-use';

function ProductCard({img, name, price}) {
  const [fav, setFav] = useState(false);

  const {width} = useWindowSize();

  return (
    <div className="productCard">
      <FavButton {...{fav, setFav, width}} />
      <img src={img} alt="Reload" />
      <div className="productCard_info">
        <h4>{name}</h4>
        <CurrencyFormat
          prefix={'₹'}
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          renderText={(value) => <h5>{value}</h5>}
        />
      </div>
    </div>
  );
}

const FavButton = ({fav, setFav, width}) => {
  return (
    <IconButton
      aria-label="Favourite"
      size={width > 769 ? 'medium' : 'small'}
      className="productCard_iconButton"
      onClick={() => setFav(!fav)}
    >
      {fav ? (
        <FavoriteIcon fontSize="small" />
      ) : (
        <FavoriteBorderIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default ProductCard;
