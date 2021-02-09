import React, {useEffect, useState} from 'react';
import '../styles/Signin.scss';
import {Link, useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Google from '../image/signin/google.svg';
import Fb from '../image/signin/fb.svg';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import db, {auth, cCustomers, fieldValue, providerGoogle} from '../firebase';
import {Backdrop, makeStyles} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Signin() {
  useEffect(() => {
    document.title = 'Bienes Mart 📦 • SignIn';
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState('');
  const [pswrd, setPswrd] = useState('');
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, pswrd)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
            setErr('Please enter a valid Email to Sign-In.');
            break;

          case 'auth/wrong-password':
            setErr('Incorrect Password!, Please enter the correct one.');
            break;

          case 'auth/user-not-found':
            setErr('Email not found. Please Sign-Up & try again.');
            break;

          case 'auth/user-disabled':
            setErr(
              'Sorry your account has been diabled. Please reach out the Support Team.'
            );
            break;

          default:
            setErr('Please refresh the page & try again.');
        }
        handleToggle();
      });
  };

  const googleSignIn = () => {
    auth
      .signInWithPopup(providerGoogle)
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          db.collection(cCustomers).doc(res.user.uid).set({
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            phone: '',
            password: '',
            photo: res.user.photoURL,
            dob: '',
            addressHome: '',
            addressOffice: '',
            timestamp: fieldValue.serverTimestamp(),
          });
        }
        history.push('/');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            setErr(`You've closed the popup without completing the Sign-In.`);
            break;

          case 'auth/popup-blocked':
            setErr(
              `Popup has been blocked. Please allow popup in browser & try again.`
            );
            break;

          default:
            setErr('Please refresh the page & try again.');
        }
        handleToggle();
      });
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setErr('');
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="signin">
      <div className="signin_container">
        <h1>Sign In</h1>
        <form>
          <h3>Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="passwordLabel">
            <h3>Password</h3>
            <h5>
              <Link to="/"> forgot password?</Link>
            </h5>
          </div>
          <div className="passwordInput">
            <input
              type={visible ? 'text' : 'password'}
              value={pswrd}
              onChange={(e) => setPswrd(e.target.value)}
              required
            />
            {visible ? (
              <VisibilityOffIcon
                className="visible"
                fontSize="small"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <VisibilityIcon
                className="visible"
                fontSize="small"
                onClick={() => setVisible(!visible)}
              />
            )}
          </div>
          <button type="submit" className="signin_button" onClick={signIn}>
            Sign in
          </button>
        </form>
        <div className="signin_signup">
          <h4>Create a account?</h4>
          <Link to="/signup">
            <IconButton aria-label="person_add" className="button">
              <PersonAddIcon className="personAdd" />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="signin_with_container">
        <h2>Or else Sign In with,</h2>
        <div className="signin_options">
          <div className="google" onClick={googleSignIn}>
            <img src={Google} alt="google" />
            <h3>Google</h3>
          </div>
          <div className="fb">
            <img src={Fb} alt="fb" />
            <h3>Facebook</h3>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <div className="signin_error">
          <div className="error_head">
            <h2>
              <span role="img" aria-label="emoji">
                😥 Oops!
              </span>
            </h2>
            <CancelIcon className="cancelIcon" />
          </div>
          <div className="error_message">
            <h4>{err}</h4>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}

export default Signin;
