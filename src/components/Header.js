import React, {useState, useRef} from 'react'; // useCallback,
import '../styles/Header.scss';
import logo from '../logo.svg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectUser} from '../app/redux/userSlice';
import {Avatar} from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {useTransition, config, useTrail, animated} from 'react-spring';
import {
  accessoriesPath,
  accountPath,
  apparelsPath,
  bulkOrdersPath,
  decorsPath,
  signinPath,
} from './Exporter';
import {useLockBodyScroll, useWindowSize} from 'react-use';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 2px',
  },
}))(Badge);

const SLIDE_OUT_MOBILE = {
  opacity: 0,
  position: 'absolute',
  height: '100vh',
  top: 55,
  transform: 'translate3d(-25rem, 0, 0)',
  zIndex: 999,
};

const SLIDE_IN_MOBILE = {
  opacity: 1,
  position: 'absolute',
  transform: 'translate3d(0, 0, 0)',
};

function Header() {
  const user = useSelector(selectUser);
  const path = !user ? signinPath : accountPath;
  const [expand, setExpand] = useState(false);

  useLockBodyScroll(expand);
  const windowSize = useWindowSize();

  const navItems = [
    {
      name: 'Apparels',
      list: [
        {name: 'Unisex', path: apparelsPath['Unisex']},
        {name: 'Mens', path: apparelsPath['Mens']},
        {name: 'Womens', path: apparelsPath['Womens']},
        {name: 'Kids', path: apparelsPath['Kids']},
      ],
    },
    {
      name: 'Accessories',
      list: [
        {name: 'Mobile Case', path: accessoriesPath['MobileCases']},
        {name: 'Pop Grips', path: accessoriesPath['PopGrips']},
        {name: 'Mugs', path: accessoriesPath['Mugs']},
        {name: 'Sipper Bottles', path: accessoriesPath['Sippers']},
        {name: 'Tote Bags', path: accessoriesPath['ToteBags']},
        {name: 'Coasters', path: accessoriesPath['Coasters']},
        {name: 'Mouse Pads', path: accessoriesPath['MousePads']},
        {name: 'Note Pads', path: accessoriesPath['NotePads']},
      ],
    },
    {
      name: 'Decors',
      list: [
        {name: 'Canvas', path: decorsPath['Canvas']},
        {name: 'Photo Frames', path: decorsPath['PhotoFrames']},
        {name: 'Posters', path: decorsPath['Posters']},
        {name: 'Dream Catchers', path: decorsPath['DreamCatchers']},
      ],
    },
  ];

  const [trailDesk, setTrailDesk] = useTrail(navItems.length + 1, () => ({
    config: config.wobbly,
    opacity: 0,
    transform: 'translateY(20px)',
  }));
  setTrailDesk({opacity: 1, transform: 'translateY(0px)'});

  const transitions = useTransition(expand, null, {
    from: SLIDE_OUT_MOBILE,
    enter: SLIDE_IN_MOBILE,
    leave: SLIDE_OUT_MOBILE,
    config: {mass: 1, tension: 200, friction: 26},
  });

  return (
    <div className="header">
      <div className="header_logo">
        {windowSize.width < 769 && <NavIcon {...{expand, setExpand}} />}
        <Link to="/" onClick={() => setExpand(false)}>
          <div className="header_logo_container">
            <img src={logo} alt="logo" />
            <h2>BienesMart</h2>
          </div>
        </Link>
      </div>
      {windowSize.width > 769 && (
        <div className="header_lists">
          <ul>
            {navItems.map((item, i) => (
              <animated.li key={i} style={trailDesk[i]}>
                <span>{item.name}</span>
                <ExpandMore fontSize="small" className="header_list_icon" />
                <ul className="header_dropdown">
                  {item.list.map((option, i) => (
                    <Link
                      to={option.path}
                      key={i}
                      className="header_dropdown_link"
                    >
                      <li>{option.name}</li>
                    </Link>
                  ))}
                </ul>
              </animated.li>
            ))}
            <Link to={bulkOrdersPath}>
              <animated.li style={trailDesk[navItems.length]}>
                <span style={{fontWeight: 'bold'}}>Bulk Orders</span>
              </animated.li>
            </Link>
          </ul>
        </div>
      )}

      <div className="header_options">
        <Link to={path} onClick={() => setExpand(false)}>
          <IconButton aria-label="account" className="iconButton_account">
            {user ? (
              <Avatar
                src={user.photo ? user.photo : '/dummy.png'}
                alt={user.name?.toUpperCase()}
              />
            ) : (
              <AccountCircleIcon className="accountIcon" />
            )}
          </IconButton>
        </Link>
        <IconButton
          aria-label="cart"
          className="iconButton_cart"
          onClick={() => setExpand(false)}
        >
          <StyledBadge badgeContent={1} color="secondary">
            <ShoppingCartIcon className="cartIcon" />
          </StyledBadge>
        </IconButton>
      </div>
      {transitions.map(({item, key, props}) =>
        item ? (
          <animated.div key={key} style={props}>
            <Expand {...{navItems, setExpand}} />
          </animated.div>
        ) : (
          <animated.div key={key} style={props} />
        )
      )}
    </div>
  );
}

const NavIcon = ({expand, setExpand}) => {
  return (
    <div className="header_navIcon">
      {expand ? (
        <CloseIcon onClick={() => setExpand(!expand)} />
      ) : (
        <DehazeIcon onClick={() => setExpand(!expand)} />
      )}
    </div>
  );
};

function Expand({navItems, setExpand}) {
  const expandElement = useRef(null);
  const [index, setIndex] = useState(null);

  const [trailMob, setTrailDesk] = useTrail(navItems.length + 1, () => ({
    config: config.stiff,
    opacity: 1,
    transform: 'translateX(-100px)',
  }));
  setTrailDesk({transform: 'translateX(0px)'});

  return (
    <div className="expand" ref={expandElement}>
      <ul>
        {navItems.map((item, i) => (
          <animated.li key={i} style={trailMob[i]}>
            <span onClick={setIndex.bind(this, i)}>
              {i === index ? (
                <IndeterminateCheckBoxIcon
                  fontSize="small"
                  className="expand_listIcon"
                />
              ) : (
                <AddBoxIcon fontSize="small" className="expand_listIcon" />
              )}
              {item.name}
            </span>
            <ul
              className={
                i === index ? 'expandExtra' : 'expandExtra expandExtra_Off'
              }
            >
              {item.list.map((option, i) => (
                <Link
                  to={option.path}
                  key={i}
                  className="expandExtra_Link"
                  onClick={() => setExpand(false)}
                  style={{animationDelay: `.${i}s`}}
                >
                  <ExpandMore
                    fontSize="small"
                    style={{transform: 'rotate(270deg)'}}
                  />
                  <li>{option.name}</li>
                </Link>
              ))}
            </ul>
          </animated.li>
        ))}
        <animated.li style={trailMob[navItems.length]}>
          <Link to={bulkOrdersPath} onClick={() => setExpand(false)}>
            <span>Bulk Orders</span>
          </Link>
        </animated.li>
      </ul>
    </div>
  );
}

export default Header;
