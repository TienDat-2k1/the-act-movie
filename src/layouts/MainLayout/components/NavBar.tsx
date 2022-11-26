import { useState } from 'react';
import { BiHomeCircle, BiSearchAlt } from 'react-icons/bi';
import { MdOutlineExplore } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './NavBar.scss';
import logo from '../../../assets/img/logo.png';
import useWinDowDimension from '../../../hooks/useWindowDimensions';

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

type NavBarProps = {
  isOnlyIcon: boolean;
  // setIsOnlyIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar: React.FC<NavBarProps> = ({ isOnlyIcon }) => {
  const [isNavMobile, setIsNavMobile] = useState(false);
  const { width } = useWinDowDimension();

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
        </nav>
      </div>
      {/* overlay */}
      <div onClick={() => setIsNavMobile(false)}></div>

      <div className="nav__toggle" onClick={() => setIsNavMobile(!isNavMobile)}>
        <FaBars />
      </div>
    </aside>
  );
};
export default NavBar;
