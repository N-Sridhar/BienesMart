import React, {useState, useEffect} from 'react';
import '../styles/Profile.scss';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../app/redux/userSlice';
import {Avatar, Button, CircularProgress, IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SaveIcon from '@material-ui/icons/Save';
import db, {cCustomers} from '../firebase';
import {storage} from '../firebase';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {Calendar} from 'react-date-range';
import moment from 'moment';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
// import {useTransition} from 'react-spring';
import {useWindowSize} from 'react-use';
import {setSlideIn} from '../app/redux/snackSlice';

function Profile() {
  const {width} = useWindowSize();

  const user = useSelector(selectUser);

  const [pic, setPic] = useState(null);
  const [picInfo, setPicInfo] = useState(false);
  const [progress, setProgress] = useState(0);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(moment(new Date()).format('DD/MM/yyyy'));
  const [calOpen, setCalOpen] = useState(false);
  const [midSave, setMidSave] = useState(false);

  const [homeAddr, setHomeAddr] = useState([]);
  const [officeAddr, setOfficeAddr] = useState([]);
  const [saveHome, setSaveHome] = useState(false);
  const [saveOffice, setSaveOffice] = useState(false);

  const [snack, setSnack] = useState(false);

  const dispatch = useDispatch();

  // const snackIn = {
  //   transform: 'translate3d(0, 0, 0)',
  // };

  // const snackOut = {
  //   transform: 'translate3d(180px, 0, 0)',
  // };

  // const transitions = useTransition(snack, null, {
  //   from: snackOut,
  //   enter: snackIn,
  //   leave: snackOut,
  // });

  useEffect(() => {
    setFname(user.name.split(' ')[0]);
    setLname(user.name.split(' ')[1]);
    setPhone(user.phone);
    setDob(user.dob);
    setHomeAddr(
      user.addressHome
        ? user.addressHome.split(',')
        : ['', '', '', '', '', '', '']
    );
    setOfficeAddr(
      user.addressOffice
        ? user.addressOffice.split(',')
        : ['', '', '', '', '', '', '']
    );
  }, [user]);

  const handlePicChange = (e) => {
    if (e.target.files[0]) {
      setPic(e.target.files[0]);
    }
  };

  const uploadPic = () => {
    setPicInfo(true);
    const uploadTask = storage
      .ref(`customers/${user.email}/photo/${pic.name}`)
      .put(pic);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref(`customers/${user.email}/photo`)
          .child(pic.name)
          .getDownloadURL()
          .then((url) => {
            db.collection(cCustomers)
              .doc(user.uid)
              .update({photo: url})
              .then(setSnack(true));
            setProgress(0);
            setPic(null);
            setPicInfo(false);
          });
      }
    );
  };

  const handleDobSelect = (date) => {
    setCalOpen(false);
    setDob(moment(date).format('DD/MM/yyyy'));
  };

  useEffect(() => {
    if (
      fname !== user.name.split(' ')[0] ||
      lname !== user.name.split(' ')[1] ||
      phone !== user.phone ||
      dob !== user.dob
    ) {
      setMidSave(true);
    } else {
      setMidSave(false);
    }
  }, [fname, lname, phone, dob, user]);

  const updateMid = () => {
    db.collection(cCustomers)
      .doc(user.uid)
      .update(
        lname
          ? {
              name: fname + ' ' + lname,
              phone: phone,
              dob: dob,
            }
          : {name: fname, phone: phone, dob: dob}
      )
      .then(() => {
        // setSnack(true);
        dispatch(setSlideIn());
      })
      .catch((err) => console.log('Failed!! ', err));
  };

  const homeAddrSet = (i) => (e) => {
    let temp = [...homeAddr];
    temp[i] = e.target.value;
    setHomeAddr(temp);
  };

  const officeAddrSet = (i) => (e) => {
    let temp = [...officeAddr];
    temp[i] = e.target.value;
    setOfficeAddr(temp);
  };

  useEffect(() => {
    if (homeAddr.toString() !== user.addressHome) {
      let valueCheck = homeAddr.every(function (element) {
        return !!element;
      });
      setSaveHome(valueCheck);
    } else {
      setSaveHome(false);
    }
  }, [homeAddr, user.addressHome]);

  useEffect(() => {
    if (officeAddr.toString() !== user.addressOffice) {
      let valueCheck = officeAddr.every(function (element) {
        return !!element;
      });
      setSaveOffice(valueCheck);
    } else {
      setSaveOffice(false);
    }
  }, [officeAddr, user.addressOffice]);

  const updateHomeAddr = () => {
    db.collection(cCustomers)
      .doc(user.uid)
      .update({addressHome: homeAddr.toString()})
      .then(dispatch(setSlideIn()))
      .catch((err) => alert(err.message));
  };

  const updateOfficeAddr = () => {
    db.collection(cCustomers)
      .doc(user.uid)
      .update({addressOffice: officeAddr.toString()})
      .then(dispatch(setSlideIn()))
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    if (snack) {
      const interval = setInterval(() => {
        setSnack(false);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [snack]);

  return (
    <div className="profile">
      <div className="profile_container">
        <div className="profile_top">
          <h5>Unique Detail's</h5>
          <div className="profile_top_container">
            <div className="top_email">
              <form>
                <h3>Email: </h3>
                <input value={user?.email} disabled />
              </form>
            </div>
            <div className="top_photo">
              {!user?.photo ? (
                <Avatar
                  src="dummy.png"
                  className="photo_avatarName"
                  alt={user.name}
                  style={{
                    height: '6rem',
                    width: '6rem',
                    border: '2px solid black',
                  }}
                />
              ) : (
                <Avatar src={user?.photo} alt="" className="photo_avatarName" />
              )}
              <label
                htmlFor="icon-button-file"
                style={picInfo ? {display: 'none'} : {}}
              >
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  className="upload_iconButton"
                >
                  <EditIcon className="editIcon" fontSize="small" />
                </IconButton>
              </label>
              <div
                className="top_photoUpload"
                style={!pic || picInfo ? {display: 'none'} : {}}
              >
                <IconButton onClick={uploadPic}>
                  <SaveIcon className="iconSave" />
                </IconButton>
                <h6>{pic?.name}</h6>
              </div>
              <input
                accept=".png, .jpg, .jpeg"
                className="top_photo_input"
                id="icon-button-file"
                type="file"
                style={{display: 'none'}}
                onChange={handlePicChange}
              />
              <h5
                style={
                  !picInfo
                    ? {display: 'none'}
                    : {margin: '0 1rem', color: 'black'}
                }
              >
                uploading... {progress}%
              </h5>
              <CircularProgress
                variant="determinate"
                value={progress}
                className="circularProgress"
                style={!picInfo ? {display: 'none'} : {}}
              />
            </div>
          </div>
        </div>
        <div className="profile_middle">
          <h5>Basic Detail's</h5>
          <div className="pMiddle_form">
            <form>
              <div className="pMiddle_form_row1">
                <div className="row1Fname">
                  <h3>First Name* :</h3>
                  <input
                    type="text"
                    placeholder="First Name*"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    style={!fname ? {borderColor: 'red'} : {}}
                  />
                </div>
                <div className="row1Lname">
                  <h3>Last Name :</h3>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lname || ''}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
                <div className="row1Phone">
                  <h3>Phone* :</h3>
                  <PhoneInput
                    defaultCountry="IN"
                    value={phone}
                    // enableSearch={true}
                    className="phoneInput"
                    placeholder="Phone number*"
                    onChange={(e) => setPhone(e)}
                  />
                </div>
              </div>
              <div className="pMiddle_form_row2">
                <div className="pMiddle_form_bday">
                  <h3>Date of Birth* :</h3>
                  <input
                    type="text"
                    value={dob || ''}
                    onClick={() => setCalOpen(true)}
                    onChange={() => setCalOpen(false)}
                  />
                </div>
                {calOpen && (
                  <div className="calendarContainer">
                    <div
                      className="calendarBg"
                      onClick={() => setCalOpen(false)}
                    />
                    <Calendar
                      date={
                        dob ? moment(dob, 'DD/MM/yyyy').toDate() : new Date()
                      }
                      onChange={handleDobSelect}
                      className="calendar"
                      color="green"
                      minDate={moment('01/01/1960', 'DD/MM/yyyy').toDate()}
                      maxDate={new Date()}
                    />
                  </div>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={!midSave || !fname || !phone ? true : false}
                  onClick={updateMid}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="profile_bottom">
          <h5>Address Detail's</h5>
          <div className="profile_bottom_container">
            <div className="address_left">
              <h4>Home address</h4>
              <div className="address_row">
                <input
                  type="text"
                  placeholder="House No,. Building Name*"
                  value={homeAddr[0] || ''}
                  onChange={homeAddrSet(0)}
                />
                <input
                  type="text"
                  placeholder="Street Name, Area*"
                  value={homeAddr[1] || ''}
                  onChange={homeAddrSet(1)}
                />
              </div>
              <input
                type="text"
                placeholder="Landmark*"
                style={width > 768 ? {width: '70%'} : {width: '18rem'}}
                value={homeAddr[2] || ''}
                onChange={homeAddrSet(2)}
              />
              <div className="address_row">
                <input
                  type="text"
                  placeholder="District/City*"
                  value={homeAddr[3] || ''}
                  onChange={homeAddrSet(3)}
                />
                <input
                  type="number"
                  placeholder="Postal Code*"
                  value={homeAddr[4] || ''}
                  onChange={homeAddrSet(4)}
                />
              </div>
              <div className="address_row last">
                <input
                  type="text"
                  placeholder="State*"
                  value={homeAddr[5] || ''}
                  onChange={homeAddrSet(5)}
                />
                <input
                  type="text"
                  placeholder="Country*"
                  value={homeAddr[6] || ''}
                  onChange={homeAddrSet(6)}
                />
              </div>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                disabled={!saveHome || homeAddr === [] ? true : false}
                onClick={updateHomeAddr}
                className="address_saveBtn"
                endIcon={<HomeIcon />}
              >
                Save Home Address
              </Button>
            </div>
            <div className="address_right">
              <h4>Office address</h4>
              <div className="address_row">
                <input
                  type="text"
                  placeholder="House No,. Building Name*"
                  value={officeAddr[0] || ''}
                  onChange={officeAddrSet(0)}
                />
                <input
                  type="text"
                  placeholder="Street Name, Area*"
                  value={officeAddr[1] || ''}
                  onChange={officeAddrSet(1)}
                />
              </div>
              <input
                type="text"
                placeholder="Landmark*"
                style={width > 768 ? {width: '70%'} : {width: '18rem'}}
                value={officeAddr[2] || ''}
                onChange={officeAddrSet(2)}
              />
              <div className="address_row">
                <input
                  type="text"
                  placeholder="District/City*"
                  value={officeAddr[3] || ''}
                  onChange={officeAddrSet(3)}
                />
                <input
                  type="number"
                  placeholder="Postal Code*"
                  value={officeAddr[4] || ''}
                  onChange={officeAddrSet(4)}
                />
              </div>
              <div className="address_row last">
                <input
                  type="text"
                  placeholder="State*"
                  value={officeAddr[5] || ''}
                  onChange={officeAddrSet(5)}
                />
                <input
                  type="text"
                  placeholder="Country*"
                  value={officeAddr[6] || ''}
                  onChange={officeAddrSet(6)}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={!saveOffice ? true : false}
                onClick={updateOfficeAddr}
                style={{borderRadius: '5px'}}
                className="address_saveBtn"
                endIcon={<BusinessIcon />}
              >
                Save Office Address
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* {transitions.map(({item, key, props}) =>
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
      )} */}
      {/* <div
        className={snackbarClass}
        style={
          snackbarClass === 'snackbar' ? {display: 'none'} : {display: 'flex'}
        }
      >
        <CheckCircleTwoToneIcon
          style={{color: 'greenyellow'}}
          className="snackbar_icon"
        />
        <h4>Updated</h4>
      </div> */}
    </div>
  );
}

export default Profile;
