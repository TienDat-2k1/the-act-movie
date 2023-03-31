import { AiFillDelete } from 'react-icons/ai';
import Modal from 'react-modal';
import Button from '../common/Button/Button';

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: () => void;
  isClear?: boolean;
  clearAll?: () => void;
};

const customStyles = {
  overlay: {
    zIndex: '999',
  },
};

const HistoryDeleteModal = ({
  isOpen,
  setIsOpen,
  handler,
  isClear,
  clearAll,
}: ModalType) => {
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
      {isClear ? (
        <h2>Remove all history?</h2>
      ) : (
        <h2>Remove this item from your history</h2>
      )}
      {isClear ? (
        <p>This will remove all history.</p>
      ) : (
        <p>This will remove your film from this history list.</p>
      )}
      <p>Are you sure?</p>
      <div className="bookmark-modal__cta">
        <Button onClick={closeModal}>Cancel</Button>
        <Button className="btn--red" onClick={isClear ? clearAll : handler}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};
export default HistoryDeleteModal;
