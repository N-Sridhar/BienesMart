import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './components/Home';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, removeUser, selectUser} from './app/redux/userSlice';
import {useEffect} from 'react';
import db, {auth, cCustomers} from './firebase';
import {useState} from 'react';
import Snackbar from './components/Snackbar';
import {
  accountPath,
  authScreens,
  Footer,
  Header,
  protectedScreens,
  publicScreens,
  signinPath,
} from './components/Exporter';
import {Suspense} from 'react';
import Loader from './components/Loader';
import {addFav} from './app/redux/favSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoader(false);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection(cCustomers)
          .doc(authUser.uid)
          .onSnapshot((snap) => {
            dispatch(
              setUser({
                addressHome: snap.data().addressHome,
                addressOffice: snap.data().addressOffice,
                dob: snap.data()?.dob,
                email: authUser.email,
                name: snap.data()?.name,
                phone: snap.data()?.phone,
                photo: snap.data()?.photo,
                uid: authUser.uid,
              })
            );
          });
        db.collection(cCustomers)
          .doc(authUser.uid)
          .collection('fav')
          .get()
          .then((snap) => {
            snap.docs.map((doc) =>
              dispatch(
                addFav({
                  id: doc.data().id,
                  img: doc.data().img,
                  name: doc.data().name,
                  price: doc.data().price,
                })
              )
            );
          });
      } else {
        dispatch(removeUser());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {loader ? (
        <Loader />
      ) : (
        <Router>
          <Suspense fallback={<Loader />}>
            <Header />
            <Snackbar />
            <Switch>
              {publicScreens.map((screen, i) => {
                return (
                  <Route
                    exact
                    path={screen.path}
                    key={i}
                    render={() => <screen.view />}
                  />
                );
              })}
              {protectedScreens.map((screen, i) => {
                return (
                  <Route
                    path={screen.path}
                    key={i}
                    render={() =>
                      user ? <screen.view /> : <Redirect to={signinPath} />
                    }
                  />
                );
              })}
              {authScreens.map((screen, i) => {
                return (
                  <Route
                    path={screen.path}
                    key={i}
                    render={() =>
                      !user ? <screen.view /> : <Redirect to={accountPath} />
                    }
                  />
                );
              })}
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            <Footer />
          </Suspense>
        </Router>
      )}
    </div>
  );
}

export default App;
