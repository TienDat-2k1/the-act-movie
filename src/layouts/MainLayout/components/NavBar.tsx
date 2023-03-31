import { useState } from 'react';
import { BiHomeCircle, BiSearchAlt } from 'react-icons/bi';
import { MdOutlineExplore } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './NavBar.scss';
import logo from '../../../assets/img/logo.png';
import useWinDowDimension from '../../../hooks/useWindowDimensions';
import { BsClockHistory, BsFillBookmarksFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedSelector } from '../../../store/user/userSelector';
import { signOutUser } from '../../../utils/firebase';
import { logOut } from '../../../store/user/userSlice';
import AuthModal from '../../../components/AuthModal/AuthModal';
import { toast } from 'react-toastify';

const menus = [
  {
    name: 'Home',
    icon: <BiHomeCircle />,
    link: 'home',
  },
  {
    name: 'Discovery',
    icon: <MdOutlineExplore />,
    link: 'discovery',
  },
  {
    name: 'Search',
    icon: <BiSearchAlt />,
    link: 'search',
  },
];

const general = [
  {
    name: 'Bookmarked',
    icon: <BsFillBookmarksFill />,
    link: 'bookmark',
  },
  {
    name: 'History',
    icon: <BsClockHistory />,
    link: 'history',
  },
];

type NavBarProps = {
  isOnlyIcon: boolean;
  // setIsOnlyIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar: React.FC<NavBarProps> = ({ isOnlyIcon }) => {
  const dispatch = useDispatch();
  const islogged = useSelector(isLoggedSelector);
  const [isNavMobile, setIsNavMobile] = useState(false);
  const { width } = useWinDowDimension();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const signout = async () => {
    await signOutUser();
    dispatch(logOut());
  };

  const signInModalOpen = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <aside
      className={`nav-bar ${width < 768 ? '' : isOnlyIcon ? 'only-icon' : ''}`}
      // onMouseMove={() => setIsOnlyIcon(false)}
      // onMouseLeave={() => setIsOnlyIcon(true)}
    >
      <Link to="/">
        <div className="logo">
          <LazyLoadImage src={logo} effect="blur" />
          <h1>TheAct</h1>
        </div>
      </Link>
      <div className={`nav-container ${isNavMobile ? 'mobile' : ''}`}>
        <nav className="nav">
          <div className="nav__menu">
            <h1>menu</h1>
            <ul>
              {menus.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.link}
                  className="nav__item"
                  onClick={() => setIsNavMobile(false)}
                >
                  {menu.icon}
                  <h2>{menu.name}</h2>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="nav__personal">
            <h1>general</h1>
            <ul>
              {general.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.link}
                  className="nav__item"
                  onClick={() => setIsNavMobile(false)}
                >
                  {menu.icon}
                  <h2>{menu.name}</h2>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="nav__general">
            <h1>personal</h1>
            <ul>
              <NavLink
                to="profile"
                className="nav__item"
                onClick={() => setIsNavMobile(false)}
              >
                {<CgProfile />}
                <h2>Profile</h2>
              </NavLink>
              {islogged ? (
                <li className="nav__item" onClick={signout}>
                  <FiLogIn />
                  <h2>Logout</h2>
                </li>
              ) : (
                <li className="nav__item" onClick={signInModalOpen}>
                  <FiLogOut />
                  <h2>Login</h2>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      {/* overlay */}
      <div onClick={() => setIsNavMobile(false)}></div>

      <div className="nav__toggle" onClick={() => setIsNavMobile(!isNavMobile)}>
        <FaBars />
      </div>

      <AuthModal
        isOpen={isSignInModalOpen}
        setIsModalOpen={setIsSignInModalOpen}
      />
    </aside>
  );
};
export default NavBar;
