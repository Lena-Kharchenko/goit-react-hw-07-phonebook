import { useDispatch } from 'react-redux';
import { setStatusFilter } from 'redux/filterSlice';
import { useGetContactsQuery } from 'redux/contactsApi';

export default function ContactFilter() {
  const dispatch = useDispatch();
  const { data: contacts, isLoading } = useGetContactsQuery();

  const handleFilterChange = e => {
    dispatch(setStatusFilter(e.target.value));
  };

  if (!isLoading && contacts.length === 0) {
    return <p>the phone book is empty</p>;
  }

  return (
    <>
      {isLoading ? (
        <p>the phone book is empty</p>
      ) : (
        <div>
          <p>Please enter the name </p>
          <input type="text" name="filter" onChange={handleFilterChange} />
        </div>
      )}
    </>
  );
}
