import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { closeModal } from './modalsSlice';

interface FormState {
    textFilter: string;
    showingMasteryFront: boolean;
}

const initialState: FormState = {
    textFilter: '',
    showingMasteryFront: true
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        clearTextFilter: (state) => {
            state.textFilter = '';
        },
        setTextFilter: (state, action: PayloadAction<string>) => {
            state.textFilter = action.payload;
        },
        toggleMasterySide: (state) => {
            state.showingMasteryFront = !state.showingMasteryFront;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(closeModal, (state) => {
            state.textFilter = '';
        })
    }
})

export const { clearTextFilter, setTextFilter, toggleMasterySide } = formSlice.actions

export default formSlice.reducer