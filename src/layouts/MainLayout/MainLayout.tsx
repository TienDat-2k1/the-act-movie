import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

import './MainLayout.scss';

const MainLayout = () => {
  return (
    <main className="main-layout">
      <NavBar />
      <div>
        <Outlet />
      </div>
    </main>
  );
};
export default MainLayout;
