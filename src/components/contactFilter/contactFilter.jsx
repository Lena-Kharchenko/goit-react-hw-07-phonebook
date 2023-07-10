import { useDispatch } from 'react-redux';
import { setStatusFilter } from 'redux/filterSlice';

export default function ContactFilter() {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setStatusFilter(e.target.value));
  };

  return (
    <>
      <p>Please enter the name </p>
      <input type="text" name="filter" onChange={handleFilterChange}></input>
    </>
  );
}
