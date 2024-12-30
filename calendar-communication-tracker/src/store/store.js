import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import communicationReducer from './communicationSlice';

export const store = configureStore({
  reducer: {
    companies: companyReducer,
    communications: communicationReducer,
  },
});
