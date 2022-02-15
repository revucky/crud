import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as productOperations from '../../../redux/Products/ProductOperation';
import s from './ProductForm.module.css';

const ProductForm = ({ closeForm, allPr, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [active, setActive] = useState('');
  const [sort_order, setSort_order] = useState('');
  const dispatch = useDispatch();

  const { createProducts } = productOperations;

  const handleSubmit = e => {
    e.preventDefault();
    // const isDuplicate = allPr => allPr.title === title;
    // allPr.some(isDuplicate)
    //   ? alert('error')
    // :
    dispatch(
      createProducts({
        title,
        text,
        image,
        url,
        active,
        sort_order,
      }),
      closeForm(),
    );
    reset();
  };

  const reset = () => {
    setTitle('');
    setText('');
    setImage('');
    setUrl('');
    setSort_order('');
    setActive('');
  };

  // useEffect(() => {
  //   if (!newProduct) return;
  //   const addNewProduct = async () => {
  //     // await onAddProduct(newProduct);
  //     setNewProduct(null);
  //     closeForm();
  //   };
  //   addNewProduct();
  // }, [closeForm, newProduct]);
  return (
    <div>
      <form className={s.wrap} onSubmit={handleSubmit}>
        <label className={s.label}>
          Title:
          <input
            className={s.input}
            type="text"
            name="title"
            value={title}
            placeholder="title"
            required
            onChange={e => setTitle(e.target.value)}
          />
        </label>{' '}
        <br />
        <label className={s.label}>
          text:
          <input
            className={s.input}
            type="text"
            name="text"
            value={text}
            placeholder="text"
            required
            onChange={e => setText(e.target.value)}
          />
        </label>{' '}
        <br />
        <label className={s.label}>
          image:
          <input
            className={s.input}
            type="text"
            name="image"
            value={image}
            placeholder="past link on image"
            onChange={e => setImage(e.target.value)}
          />
        </label>{' '}
        <br />
        <label className={s.label}>
          active:
          <input
            className={s.input}
            type="number"
            name="active"
            value={active}
            placeholder="active"
            onChange={e => setActive(e.target.value)}
          />
        </label>
        <br />
        <label className={s.label}>
          sort:
          <input
            className={s.input}
            type="number"
            name="sort_order"
            value={sort_order}
            placeholder="sort"
            onChange={e => setSort_order(e.target.value)}
          />
        </label>
        <br />
        <label className={s.label}>
          link:
          <input
            className={s.input}
            type="url"
            name="url"
            value={url}
            placeholder="here you can past some link"
            onChange={e => setUrl(e.target.value)}
          />
        </label>
        <br />
        <div>
          <button className={s.btn} type="submit">
            Confirm
          </button>
          <button className={s.btn} type="button" onClick={closeForm}>
            Decline
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
