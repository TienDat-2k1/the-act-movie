import { useMemo } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
// import { BsFacebook } from 'react-icons/bs';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isLoggedSelector } from '../../store/user/userSelector';
import { signInError, signInSuccess } from '../../store/user/userSlice';
import {
  createUserDocumentFromAuth,
  // signInWithFacebookPopup,
  signInWithGooglePopup,
} from '../../utils/firebase';
import Button from '../common/Button/Button';
import './AuthModal.scss';
import { useLocation, useNavigate } from 'react-router-dom';

type AuthModalType = {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const customStyles = {
  overlay: {
    zIndex: '999',
  },
};

const AuthModal = ({ isOpen, setIsModalOpen }: AuthModalType) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector(isLoggedSelector);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useMemo(() => {
    if (isLogged) {
      location.state && navigate(location.state.from);
      closeModal();
    }
  }, [isLogged]);

  const logGoogleUser = async () => {
    const res = await signInWithGooglePopup();
    const userRef = await createUserDocumentFromAuth(res.user);

    if (res.user) {
      const { uid, displayName, email, photoURL } = res.user;
      const { bookmarks, history } = userRef;

      dispatch(
        signInSuccess({ uid, displayName, email, photoURL, bookmarks, history })
      );
      toast.success('Login successful');
    } else {
      dispatch(signInError(res));
    }
  };

  // const logFbUser = async () => {
  //   const res = await signInWithFacebookPopup();
  // };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="auth-modal"
    >
      <h1 className="auth__title">Choose Method Sign In</h1>
      <div className="auth__buttons">
        <Button
          className="btn--outline btn--primary auth__btn"
          onClick={logGoogleUser}
        >
          <AiOutlineGoogle className="auth__icon" /> Sign In With Google
        </Button>
        {/* <Button
          className="btn--outline btn--primary auth__btn"
          onClick={logFbUser}
        >
          <BsFacebook className="auth__icon" /> Sign In With Facebook
        </Button> */}
      </div>
    </Modal>
  );
};
export default AuthModal;
