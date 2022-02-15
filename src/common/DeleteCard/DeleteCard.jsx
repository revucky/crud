import Button from '../Button';
import styles from './DeleteCard.module.css';

const DeleteCard = ({ text, onDelete, onClose }) => {
  return (
    <div className={styles.modalContent}>
      <p>{text}</p>
      <div className={styles.btnWrapper}>
        <Button text="no" onClick={onClose} />
        <Button text="yes" onClick={onDelete} />
      </div>
    </div>
  );
};

export default DeleteCard;
