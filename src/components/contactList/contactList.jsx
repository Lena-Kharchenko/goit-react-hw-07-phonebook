import { useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import css from './contactList.module.css';

export default function ContactList() {
  const contactsRedux = useSelector(state => state.contacts);
  const filterRedux = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const onDeleteContact = e => {
    dispatch(deleteContact(e.target.id));
    Notiflix.Notify.success(`The contact has been successfully deleted`);
  };

  const visibleContacts = filterRedux
    ? contactsRedux.filter(contact => contact.name.includes(filterRedux))
    : contactsRedux;

  return (
    <>
      {visibleContacts.length === 0 ? (
        <div>Empty</div>
      ) : (
        <ul>
          {visibleContacts.map(({ name, id, number }) => (
            <li key={id}>
              <span className={css.name}> {name}:</span>
              <span className={css.number}>{number}</span>
              <button type="button" id={id} onClick={onDeleteContact}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
