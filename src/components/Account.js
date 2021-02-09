import React, {useState} from 'react';
import {useEffect} from 'react';
import {auth} from '../firebase';
import '../styles/Account.scss';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Profile from './Profile';
import Favourite from './Favourite';
import Orders from './Orders';

function Account() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [docTitle, setDocTitle] = useState('Account / Profile');

  useEffect(() => {
    document.title = `Bienes Mart 📦 • ${docTitle}`;
  }, [docTitle]);

  const options = [{name: 'Profile'}, {name: 'Favourite'}, {name: 'Orders'}];

  const [render, setRender] = useState('Profile');

  const handleRender = (view) => {
    setRender(view);
    setDocTitle(
      view === 'Profile'
        ? 'Account / Profile'
        : view === 'Favourite'
        ? 'Account / Favourite'
        : 'Account / Orders'
    );
  };

  const signOut = () => {
    auth
      .signOut()
      .then(window.location.reload())
      .catch((err) => alert(err.message));
  };
  return (
    <div className="account">
      <div className="account_sidebar">
        <div className="account_sidebar_header">
          <h2>ACCOUNT</h2>
        </div>
        <div className="account_sidebar_MobMid">
          {options.map((option, i) => (
            <div
              className="account_sidebar_options"
              key={i}
              onClick={() => handleRender(option.name)}
            >
              <h2
                style={
                  render === option.name
                    ? {color: 'white', backgroundColor: 'grey'}
                    : {}
                }
              >
                {option.name}
              </h2>
            </div>
          ))}
        </div>
        <div className="account_sidebar_MobBot">
          <div className="quote">
            <h3>
              Happy Customer's ! <br /> Happy Us !!
            </h3>
          </div>
          <div className="sidebar_signOut">
            <Button
              variant="contained"
              color="secondary"
              className="sidebar_signOut_button"
              onClick={signOut}
              endIcon={<ExitToAppIcon />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      <div className="displayArea">
        {render.match('Profile') ? (
          <Profile />
        ) : render.match('Favourite') ? (
          <Favourite />
        ) : (
          <Orders />
        )}
      </div>
    </div>
  );
}

export default Account;
