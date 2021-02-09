import React, {useEffect} from 'react';
import '../styles/Snackbar.scss';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import {useTransition, animated} from 'react-spring';
import {useDispatch, useSelector} from 'react-redux';
import {removeSlideIn, selectSnack} from '../app/redux/snackSlice';

function Snackbar() {
  const snack = useSelector(selectSnack);

  const dispatch = useDispatch();

  const snackIn = {
    transform: 'translate3d(0, 0, 0)',
  };

  const snackOut = {
    transform: 'translate3d(180px, 0, 0)',
  };

  const transitions = useTransition(snack, null, {
    from: snackOut,
    enter: snackIn,
    leave: snackOut,
  });

  useEffect(() => {
    if (snack) {
      const interval = setInterval(() => {
        dispatch(removeSlideIn());
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [snack, dispatch]);

  return (
    <>
      {transitions.map(({item, key, props}) =>
        item ? (
          <animated.div key={key} style={props} className="snackbar">
            <CheckCircleTwoToneIcon
              style={{color: 'greenyellow'}}
              className="snackbar_icon"
            />
            <h4>Updated</h4>
          </animated.div>
        ) : (
          <animated.div key={key}></animated.div>
        )
      )}
    </>
  );
}

export default Snackbar;
