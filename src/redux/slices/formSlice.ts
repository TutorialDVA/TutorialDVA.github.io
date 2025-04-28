import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { closeModal } from './modalsSlice';

interface FormState {
    textFilter: string;
    showingMasteryFront: boolean;
    showingAlert: boolean;
    bannerMessage: string
    bannerSeverity: "success" | "info" | "warning" | "error",
    bannerTimeout: number
}

const initialState: FormState = {
    textFilter: '',
    showingMasteryFront: true,
    showingAlert: false,
    bannerMessage: '',
    bannerSeverity: "success",
    bannerTimeout: 10000
}

export interface BannerAction {
    bannerMessage: string
    bannerSeverity: "success" | "info" | "warning" | "error",
    bannerTimeout?: number
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
        },
        toggleShowingBanner: (state) => {
            state.showingAlert = !state.showingAlert
        },
        setBannerMessage: (state, action: PayloadAction<string>) => {
            state.bannerMessage = action.payload
        },
        setBannerTimeout: (state, action: PayloadAction<number>) => {
            state.bannerTimeout = action.payload
        },
        createBanner: (state, action: PayloadAction<BannerAction>) => {
            state.bannerMessage = action.payload.bannerMessage;
            state.bannerSeverity = action.payload.bannerSeverity
            if (action.payload.bannerTimeout) {
                state.bannerTimeout = action.payload.bannerTimeout
            }
            state.showingAlert = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(closeModal, (state) => {
            state.textFilter = '';
        })
    }
})

export const { clearTextFilter, setTextFilter, toggleMasterySide, toggleShowingBanner, setBannerMessage, setBannerTimeout, createBanner } = formSlice.actions

export default formSlice.reducer