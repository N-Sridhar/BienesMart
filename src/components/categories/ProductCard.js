import React, {useCallback, useEffect, useState} from 'react';
import '../../styles/categories/ProductCard.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {IconButton} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import {useWindowSize} from 'react-use';
import db, {cCustomers, fieldValue} from '../../firebase';
import {selectUser} from '../../app/redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {addFav, getFav, removeFav, updateFav} from '../../app/redux/favSlice';

function ProductCard({id, img, name, price}) {
  const {width} = useWindowSize();
  const [favIconFill, setFavIconFill] = useState(false);
  const [iconDisable, setIconDisable] = useState(true);
  const user = useSelector(selectUser);
  const favourits = useSelector(getFav);
  const dispatch = useDispatch();

  useEffect(() => {
    setIconDisable(user === null ? true : false);
  }, [user]);

  const checkFavUpdate = useCallback(
    (favProduct) => {
      if (
        id !== favProduct.id ||
        img !== favProduct.img ||
        name !== favProduct.name ||
        price !== favProduct.price
      ) {
        const updatedFavProduct = {id: id, img: img, name: name, price: price};
        dispatch(updateFav(updatedFavProduct));
        db.collection(cCustomers)
          .doc(user.uid)
          .collection('fav')
          .doc(id)
          .update({img: img, name: name, price: price})
          .then(dispatch(updateFav(updatedFavProduct)));
      }
    },
    [user.uid, id, img, name, price, dispatch]
  );

  useEffect(() => {
    if (favourits.length >= 1) {
      for (var i = 0; i <= favourits.length; i++) {
        if (id === favourits[i]?.id) {
          setFavIconFill(true);
          checkFavUpdate(favourits[i]);
          break;
        } else {
          setFavIconFill(false);
        }
      }
    } else {
      setFavIconFill(false);
    }
  }, [id, img, name, price, favourits, checkFavUpdate]);

  const favHandler = () => {
    if (!favIconFill) {
      db.collection(cCustomers)
        .doc(user.uid)
        .collection('fav')
        .doc(id)
        .set({
          id: id,
          img: img,
          name: name,
          price: price,
          timestamp: fieldValue.serverTimestamp(),
        })
        .then(() => {
          dispatch(
            addFav({
              id: id,
              img: img,
              name: name,
              price: price,
            })
          );
          // setFavIconFill(true);
        });
    } else {
      db.collection(cCustomers)
        .doc(user.uid)
        .collection('fav')
        .doc(id)
        .delete()
        .then(() => {
          dispatch(removeFav(id));
          // setFavIconFill(false);
        });
    }
  };

  return (
    <div className="productCard">
      <FavButton
        {...{
          favIconFill,
          iconDisable,
          favHandler,
          width,
        }}
      />
      <img src={img} alt="Reload" />
      <h4>{name}</h4>
      <CurrencyFormat
        prefix={'₹'}
        value={price}
        displayType={'text'}
        thousandSeparator={true}
        renderText={(value) => <h5>{value}</h5>}
      />
    </div>
  );
}

const FavButton = ({favIconFill, iconDisable, favHandler, width}) => {
  return (
    <IconButton
      aria-label="Favourite"
      size={width > 769 ? 'medium' : 'small'}
      className="productCard_iconButton"
      disabled={iconDisable}
      onClick={favHandler}
    >
      {favIconFill ? (
        <FavoriteIcon fontSize="small" />
      ) : (
        <FavoriteBorderIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default ProductCard;
