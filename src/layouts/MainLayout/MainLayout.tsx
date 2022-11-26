import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

import './MainLayout.scss';

type MainLayoutProps = {
  isOnlyIcon: boolean;
};

const MainLayout = ({ isOnlyIcon }: MainLayoutProps) => {
  // const [isOnlyIcon, setIsOnlyIcon] = useState(true);

  return (
    <main className="main-layout">
      <NavBar isOnlyIcon={isOnlyIcon} />
      <div className={`${isOnlyIcon ? 'nav-only-icon' : ''}`} id="main">
        <Outlet />
      </div>
    </main>
  );
};
export default MainLayout;
