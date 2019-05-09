import React from 'react';
import ProfileForm from './ProfileForm';
import UserInfo from './UserInfo';

const UserProfile = () => (
  <div className="content">
    <div className="container-fluid" style={{paddingLeft: '0px'}}>
      <div className="row">
        <div className="col-md-8">
          <ProfileForm />
        </div>
        <div className="col-md-4">
          <UserInfo />
        </div>
      </div>
    </div>
  </div>
);

export default UserProfile;