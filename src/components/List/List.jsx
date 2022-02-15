import CardWithMenu from '../CardwithMenu/CardwithMenu';
import s from './List.module.css';

const List = ({ list, onDel, edit, closeForm }) => {
  return (
    <div>
      <ul className={s.list}>
        {list.map(prod => (
          <li className={s.item} key={prod.id}>
            <div>
              <div className={s.titleWrap}>
                <h3>{prod.title}</h3>
                <CardWithMenu
                  onEdit={() => edit(prod)}
                  onDele={() => onDel(prod)}
                  closeForm={closeForm}
                />
              </div>
              <p style={{ margin: 0 }}>{prod.text}</p>
              <div className={s.imgWrap}>
                <img className={s.img} src={prod.image} alt="" />
                <a href={prod.url}>your link</a>
              </div>
              <p>active:{prod.active} </p>
              <p>sort:{prod.sort_order}</p>
              <p>{prod.created_at}</p>
              <p>{prod.updated_at}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;
