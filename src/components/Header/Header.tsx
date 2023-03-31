import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedSelector, userSelector } from '../../store/user/userSelector';
import SearchInput from '../common/SearchInput/SearchInput';
import './Header.scss';
import AuthModal from '../AuthModal/AuthModal';
import { signOutUser } from '../../utils/firebase';
import { logOut } from '../../store/user/userSlice';

type HeaderProps = {
  currentTab: string;
  onChangeTab: (tab: 'movie' | 'tv') => void;
};

const Header: React.FC<HeaderProps> = ({ currentTab, onChangeTab }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(isLoggedSelector);
  const user = useSelector(userSelector);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const signOut = async () => {
    await signOutUser();

    dispatch(logOut());
  };

  const signInModalOpen = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <header className="header">
      <nav>
        <ul>
          {[
            { tab: 'tv', name: 'TV Show' },
            { tab: 'movie', name: 'Movie' },
          ].map((tab, i) => (
            <li
              key={i}
              className={currentTab === tab.tab ? 'active' : ''}
              onClick={() => onChangeTab(tab.tab as 'movie' | 'tv')}
            >
              <span>{tab.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="home__search">
        <SearchInput />
      </div>
      {isLogged && (
        <Tippy
          interactive
          render={attrs => (
            <div className="user-popup" {...attrs}>
              <ul className="user-popup__list">
                <li className="user-popup__item" onClick={signOut}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        >
          <div className="home__user">
            <h4>{user.displayName}</h4>
            <div>
              {user.photoURL && (
                <LazyLoadImage src={user.photoURL} effect="blur" alt="avatar" />
              )}
              {/* {user.photoURL && <img src={user.photoURL} alt="avatar" />} */}
            </div>
          </div>
        </Tippy>
      )}
      {!isLogged && (
        <div className="home__user">
          <Tippy
            render={attrs => (
              <div className="box" {...attrs}>
                Login now
              </div>
            )}
          >
            <button
              className="btn btn--outline btn--round btn--primary"
              style={{ fontSize: '2rem' }}
              onClick={signInModalOpen}
            >
              SignIn
            </button>
          </Tippy>
        </div>
      )}
      <AuthModal
        isOpen={isSignInModalOpen}
        setIsModalOpen={setIsSignInModalOpen}
      />
    </header>
  );
};
export default Header;
