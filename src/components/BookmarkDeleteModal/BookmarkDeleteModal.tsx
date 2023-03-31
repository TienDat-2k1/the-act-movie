import { AiFillDelete } from 'react-icons/ai';
import Modal from 'react-modal';
import Button from '../common/Button/Button';

import './BookmarkDeleteModal.scss';

type ModalType = {
  isOpen: boolean;
  handler: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const customStyles = {
  overlay: {
    zIndex: '999',
  },
};

const BookmarkDeleteModal = ({ isOpen, handler, setIsOpen }: ModalType) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="bookmark-modal"
      shouldCloseOnOverlayClick={true}
    >
      <AiFillDelete className="bookmark-modal__icon" />
      <h2>Remove this item from your bookmarks</h2>
      <p>This will remove your film from this bookmark list.</p>
      <p>Are you sure?</p>
      <div className="bookmark-modal__cta">
        <Button onClick={closeModal}>Cancel</Button>
        <Button className="btn--red" onClick={handler}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};
export default BookmarkDeleteModal;
