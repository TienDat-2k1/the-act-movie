import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Profile.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/userSelector';
import { BsPencilFill } from 'react-icons/bs';

const Profile = () => {
  const user = useSelector(userSelector);
  return (
    <div className="profile">
      <h1 className="profile__title">Account Setting</h1>
      {user && (
        <div className="profile-container">
          <div className="profile__l">
            <div className="profile__content">
              <h3>User Information</h3>
              <p>Here you can edit public information about yourself.</p>
            </div>
            <div className="profile__content">
              <h3>Thông báo</h3>
              <p>Tính năng này hiện vẫn đang trong quá trình phát triển.</p>
            </div>
          </div>
          <div className="profile__r">
            <h3>Profile photo</h3>
            <div className="profile__photo">
              {user.photoURL && (
                <LazyLoadImage
                  src={user.photoURL}
                  wrapperClassName="profile__avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  effect="blur"
                />
              )}
              <label htmlFor="profile-photo">
                <BsPencilFill />
              </label>
              <input type="file" id="profile-photo" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
