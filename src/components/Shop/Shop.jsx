import { useState, useCallback, useEffect } from 'react';
import ProductForm from './ProductForm/ProductForm';
import Button from '../../common/Button';
import Modal from '../../common/Modal/Modal';
import DeleteCard from '../../common/DeleteCard/DeleteCard';
import EditCard from '../../common/EditCard/EditCard';
import List from '../List/List';
import * as productOperations from '../../redux/Products/ProductOperation';
import { useDispatch, useSelector } from 'react-redux';

const ACTION = {
  NONE: 'none',
  EDIT: 'edit',
  DELETE: 'delete',
};

const { getProducts, deleteProducts, editProducts } = productOperations;
const Shop = () => {
  const allProduct = useSelector(state => state.products.data.items);
  const dispatch = useDispatch();
  //form modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDelFormOpen, setIsDelFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  //
  const [action, setAction] = useState(ACTION.NONE);
  const [activeProd, setActiveProd] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // edit
  const handleEdit = activeProd => {
    setIsEditFormOpen(true);
    setActiveProd(activeProd);
  };
  const confirmEdit = (editedProdName, editedTextName) => {
    if (editedProdName === activeProd || editedTextName === activeProd) {
      closeEditmodal();
      return;
    }

    setAction(ACTION.EDIT);
    setActiveProd({
      ...activeProd,
      title: editedProdName,
      text: editedTextName,
    });
  };
  useEffect(() => {
    if (action !== ACTION.EDIT) return;
    dispatch(editProducts(activeProd));
    setAction(ACTION.NONE);
    closeEditmodal();
    setActiveProd(null);
  }, [action, activeProd, dispatch]);

  const closeEditmodal = () => {
    setIsEditFormOpen(false);
  };
  // delete
  const handleStartDel = activeProd => {
    setIsDelFormOpen(true);
    setActiveProd(activeProd);

    // console.log(activeProd);
  };
  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;
    dispatch(deleteProducts(activeProd.id)).then(() => {
      setAction(ACTION.NONE);
      closeDelModal();
      setActiveProd(null);
    });
  }, [action, activeProd, dispatch]);
  // const handleDelete = id => {
  //   dispatch(deleteProducts(id));
  //   // setAllProduct(allProduct.filter(({ name }) => name !== activeProd));
  // closeDelModal();
  // setActiveProd('');
  // };
  const closeDelModal = () => {
    setIsDelFormOpen(false);
  };
  //close add product
  const toggleForm = useCallback(
    () => setIsFormOpen(prevIsFormOpen => !prevIsFormOpen),
    [],
  );

  return (
    <div>
      <Button
        onClick={toggleForm}
        text={isFormOpen ? 'decline add' : 'add product'}
      />

      {isFormOpen && (
        <Modal title="Add product" closeForm={toggleForm}>
          <ProductForm allPr={allProduct} closeForm={toggleForm} />
        </Modal>
      )}

      <List
        list={allProduct}
        closeForm={toggleForm}
        edit={handleEdit}
        onDel={handleStartDel}
      />
      {isDelFormOpen && (
        <Modal title="Deleting..." closeForm={closeDelModal}>
          <DeleteCard
            text="Are you sure?"
            onDelete={confirmDelete}
            onClose={closeDelModal}
          />
        </Modal>
      )}
      {isEditFormOpen && (
        <Modal title="Edit" closeForm={closeEditmodal}>
          <EditCard
            text="Here you can change title"
            titleIn={activeProd.title}
            nameIn={activeProd.text}
            onSave={confirmEdit}
          />
        </Modal>
      )}
    </div>
  );
};

export default Shop;
