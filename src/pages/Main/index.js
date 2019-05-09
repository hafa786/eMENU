import React from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
import ThemeOptions from '../../components/ThemeOptions';
import MobileMenu from '../../components/MobileMenu';
/**
 * Pages
 */
import Frontpage from '../Frontpage';
import Login from '../Login';
import Signup from '../Signup';
import Profile from '../Profile';
import AboutUs from '../AboutUs';
import Dashboard from '../Dashboard';

import FAQ from '../FAQ';
import Privacy from '../Privacy';
import Terms from '../Terms';

const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        <div className="main-panel">
        {/* get the routes of every page */}
          <Route exact path="/" component={Login} />
          <Route exact path="/Frontpage" component={Frontpage} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/FAQ" component={FAQ} />
          <Route exact path="/Privacy" component={Privacy} />
          <Route exact path="/Terms" component={Terms} />
        </div>
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));