import React, {useEffect, useState} from 'react';
import '../styles/Signup.scss';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import {Link, useHistory} from 'react-router-dom';
import {Backdrop, IconButton, makeStyles} from '@material-ui/core';
import db, {auth, cCustomers, fieldValue} from '../firebase';
import {useDispatch} from 'react-redux';
import {setUser} from '../app/redux/userSlice';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Signup() {
  useEffect(() => {
    document.title = 'Bienes Mart 📦 • SignUp';
    window.scrollTo(0, 0);
  }, []);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pswrd, setPswrd] = useState('');
  const [cnfrmPswrd, setCnfrmPswrd] = useState('');
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);
  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setErr('');
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const signUp = (e) => {
    e.preventDefault();
    if (fname && phone)
      auth
        .createUserWithEmailAndPassword(email, pswrd)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: lname ? fname + ' ' + lname : fname,
            })
            .then(() => {
              db.collection(cCustomers).doc(res.user.uid).set({
                uid: res.user.uid,
                email: res.user.email,
                name: res.user.displayName,
                password: pswrd,
                phone: phone,
                photo: res.user.photoURL,
                dob: '',
                addressHome: '',
                addressOffice: '',
                timestamp: fieldValue.serverTimestamp(),
              });
              dispatch(
                setUser({
                  email: res.user.email,
                  name: fname + ' ' + lname,
                  phone: phone,
                  photo: res.user.photoURL,
                  uid: res.user.uid,
                  dob: '',
                  addressHome: '',
                  addressOffice: '',
                })
              );
            })
            .catch((err) => {
              setErr('Please refresh the page & try once again.');
            });
          history.push('/');
        })
        .catch((err) => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              setErr('The Email is already exists with an account.');
              break;

            case 'auth/invalid-email':
              setErr('Please enter a valid Email to continue.');
              break;

            case 'auth/weak-password':
              setErr('Your password is not strong enough.');
              break;

            default:
              setErr('Please refresh the page & try again.');
          }
          handleToggle();
        });
  };

  return (
    <div className="signup">
      <div className="signup_container">
        <h1>Sign Up</h1>
        <form>
          <div className="name">
            <div className="fName">
              <h3>First Name*</h3>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="lName">
              <h3>Last Name</h3>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
          <h3>Email*</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h3>Phone*</h3>
          <PhoneInput
            defaultCountry="IN"
            value={phone}
            onChange={(e) => setPhone(e)}
            required
          />
          <h3>Password*</h3>
          <div className="password">
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
          <h3>Confirm Password*</h3>
          <div className="passwordConfirm">
            <input
              type="password"
              value={cnfrmPswrd}
              onChange={(e) => {
                setCnfrmPswrd(e.target.value);
                setOk(true);
              }}
              required
            />
            {pswrd === cnfrmPswrd ? (
              <CheckCircleIcon
                className="ok"
                fontSize="small"
                style={!ok ? {display: 'none'} : {}}
              />
            ) : (
              <CancelIcon
                className="notOk"
                fontSize="small"
                style={!ok ? {display: 'none'} : {}}
              />
            )}
          </div>
          <button
            type="submit"
            className="signup_button"
            style={!fname || !phone ? {textDecoration: 'line-through'} : {}}
            disabled={pswrd === cnfrmPswrd && fname && phone ? false : true}
            onClick={signUp}
          >
            Sign Up
          </button>
        </form>
        <div className="signup_signin">
          <h4>Already a Customer?</h4>
          <Link to="/signin">
            <IconButton aria-label="person_pin" className="button">
              <PersonPinIcon className="personPin" />
            </IconButton>
          </Link>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <div className="signup_error">
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

export default Signup;
