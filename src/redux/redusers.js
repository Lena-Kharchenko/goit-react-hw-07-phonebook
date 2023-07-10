import { combineReducers } from 'redux';
import { tasksReducer } from './contactSlice';
import { filterReducer } from './filterSlice';

export const rootReducer = combineReducers({
  contacts: tasksReducer,
  filters: filterReducer,
});
