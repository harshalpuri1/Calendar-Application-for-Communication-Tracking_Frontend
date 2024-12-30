import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCompanies } from '../services/api';

export const getCompanies = createAsyncThunk('companies/getCompanies', async () => {
  const response = await fetchCompanies();
  return response.data;
});

const companySlice = createSlice({
  name: 'companies',
  initialState: { companies: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
      state.status = 'success';
    });
  },
});

export default companySlice.reducer;
