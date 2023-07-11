// import { createSlice, nanoid } from '@reduxjs/toolkit';
// import contacts from 'savedContactList/savedContactList';

// const contactInitialState = [...contacts];

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: contactInitialState,
//   reducers: {
//     addContacts: {
//       reducer(state, { payload }) {
//         state.push(payload);
//       },
//       prepare(name, number) {
//         return {
//           payload: {
//             id: nanoid(),
//             name,
//             number,
//           },
//         };
//       },
//     },
//     deleteContact: (state, { payload }) =>
//       state.filter(contact => contact.id !== payload),
//   },
// });

// export const { addContacts, deleteContact } = contactSlice.actions;
// export const tasksReducer = contactSlice.reducer;

import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { addContacts, deleteContacts, fetchContacts } from './operations';
import {
  handleAddContacts,
  handleDeleteContact,
  handleFetchContacts,
  handlePending,
  handleRej,
  processingOperations,
} from './builderFn';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFetchContacts)
      .addCase(addContacts.fulfilled, handleAddContacts)
      .addCase(deleteContacts.fulfilled, handleDeleteContact)
      .addMatcher(isAnyOf(...processingOperations('pending')), handlePending)
      .addMatcher(isAnyOf(...processingOperations('rejected')), handleRej);
  },
});

export const contactsReducer = contactsSlice.reducer;
