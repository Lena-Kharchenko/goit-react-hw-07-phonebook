import { useSelector } from 'react-redux';
// import { deleteContact } from 'redux/contactSlice';
// import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import css from './contactList.module.css';
import {
  useGetContactsQuery,
  useDeleteContactsMutation,
} from 'redux/contactsApi';
import { selectFilterField } from 'redux/selectors';

export default function ContactList() {
  // const contactsRedux = useSelector(state => state.contacts);
  // const filterRedux = useSelector(state => state.filters);
  // const dispatch = useDispatch();

  const { data: contacts, isLoading } = useGetContactsQuery();
  const [func] = useDeleteContactsMutation();

  const filterValue = useSelector(selectFilterField);

  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );

  // const onDeleteContact = e => {
  //   dispatch(deleteContact(e.target.id));
  //   Notiflix.Notify.success(`The contact has been successfully deleted`);
  // };

  // const visibleContacts = filterRedux
  //   ? contactsRedux.filter(contact => contact.name.includes(filterRedux))
  //   : contactsRedux;

  return (
    <>
      {/* {visibleContacts.length === 0 ? (
        <div>Empty</div>
      ) : ( */}
      {isLoading ? <div>Loading...</div> : ''}
      <ul>
        {!isLoading &&
          filteredContacts().map(({ name, phone, id }) => (
            <li key={id}>
              <span className={css.name}> {name}:</span>
              <span className={css.number}>{phone}</span>
              <button
                type="button"
                id={id}
                onClick={() => {
                  Notiflix.Notify.success(`You delete contact`);
                  func(id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
