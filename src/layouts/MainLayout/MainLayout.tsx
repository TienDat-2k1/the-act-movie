import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

import './MainLayout.scss';

const MainLayout = () => {
  const [isOnlyIcon, setIsOnlyIcon] = useState(true);

  return (
    <main className="main-layout">
      <NavBar isOnlyIcon={isOnlyIcon} setIsOnlyIcon={setIsOnlyIcon} />
      <div className={`${isOnlyIcon ? 'nav-only-icon' : ''}`}>
        <Outlet />
      </div>
    </main>
  );
};
export default MainLayout;
