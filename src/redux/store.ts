import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './slices/characterSlice';
import modalsReducer from './slices/modalsSlice';
import formReducer from './slices/formSlice';

export const store = configureStore({
    reducer: {
        character: characterReducer,
        modals: modalsReducer,
        form: formReducer
    },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch