import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import salesData from "../assets/stackline_frontend_assessment_data_2021.json";

interface DataState {
    data: ProductData;
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    data: {} as ProductData,
    loading: false,
    error: null,
};

export const fetchSalesData = createAsyncThunk(
    'data/fetchSalesData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve(salesData[0]), 500) // Simulates a 500ms network delay
            );
            console.log(response)
            return response as ProductData;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to load data");
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {}, // No synchronous reducers for now
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalesData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSalesData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSalesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dataSlice.reducer;
