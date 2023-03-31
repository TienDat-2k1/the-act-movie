import { useState } from 'react';

import Button from '../../components/common/Button/Button';
import './RequireAuthen.scss';
import AuthModal from '../../components/AuthModal/AuthModal';

const RequireAuthen = () => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

  return (
    <div className="require-auth">
      <h1>If you want to access this page, please login!!!</h1>
      <Button
        className="btn--round btn--red"
        onClick={() => setIsOpenAuthModal(true)}
      >
        Login now
      </Button>
      <AuthModal isOpen={isOpenAuthModal} setIsModalOpen={setIsOpenAuthModal} />
    </div>
  );
};
export default RequireAuthen;
