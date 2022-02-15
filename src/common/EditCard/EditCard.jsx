import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Button from '../Button';
import styles from './EditCard.module.css';

const EditCard = ({ text, onSave, titleIn, nameIn }) => {
  const [input, setInput] = useState(titleIn);
  const [name, setName] = useState(nameIn);
  const inputRef = useRef(null);
  // const nameRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    // nameRef.current.focus();
  }, []);

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSave(input, name);
    reset();
  };

  const reset = () => setInput('');

  const inputId = nanoid();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p>{text}</p>
      <label htmlFor={inputId}>
        Change title
        <span className={styles.red}>*</span>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={input}
          onChange={handleChange}
        />
      </label>
      <hr />
      <label htmlFor={inputId}>
        Change name
        <span className={styles.red}>*</span>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <div className={styles.btnWrapper}>
        <Button type="submit" text="save" disabled={!input} />
      </div>
    </form>
  );
};
export default EditCard;
