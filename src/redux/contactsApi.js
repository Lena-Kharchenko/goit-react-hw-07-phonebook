import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64ac1ccb9edb4181202f1ffb.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: contactId => ({
        method: 'delete',
        url: `/contacts/${contactId}`,
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: contact => ({
        method: 'POST',
        url: `/contacts`,
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactsMutation,
  useAddContactMutation,
} = contactsApi;
