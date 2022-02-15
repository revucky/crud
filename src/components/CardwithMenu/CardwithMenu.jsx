import { Component } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import s from './CardMenu.module.css';

class CardWithMenu extends Component {
  state = {
    isMenuOpen: false,
  };

  toggleMenu = () =>
    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));

  handleEdit = () => {
    this.props.onEdit();
    this.toggleMenu();
  };

  handleDelete = () => {
    this.props.onDele();
    this.toggleMenu();
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <div className={s.cardStyles}>
        <button className={s.dotes} onClick={this.toggleMenu} aria-label="Menu">
          <BiDotsVertical />
        </button>
        {isMenuOpen && (
          <div className={s.menuStyles}>
            <div className={s.menuItem} onClick={this.handleEdit}>
              <button className={s.button} type="button">
                edit
              </button>
            </div>
            <div className={s.menuItem} onClick={this.handleDelete}>
              <button className={s.button} type="button">
                delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CardWithMenu;
