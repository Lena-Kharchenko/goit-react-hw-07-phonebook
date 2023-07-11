import { addContacts, deleteContacts, fetchContacts } from './operations';

const contactsFunctionsArr = [addContacts, deleteContacts, fetchContacts];

export const processingOperations = type =>
  contactsFunctionsArr.map(fn => fn[type]);

export const handlePending = state => {
  state.isLoading = true;
};
export const handleRej = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const handleFetchContacts = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
  state.error = null;
};

export const handleDeleteContact = (state, action) => {
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

export const handleAddContacts = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
  state.error = null;
};
