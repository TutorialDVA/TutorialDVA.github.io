import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Import your RootState type
import {
    openModal,
    closeModal,
    updateModalContent,
    updateModalHeading,
    setModalItems
} from '../redux/slices/modalsSlice';

export function useModal(modalId: string) {
    const dispatch = useDispatch();
    const modalState = useSelector((state: RootState) => state.modals[modalId]);

    return {
        isOpen: modalState?.isOpen || false,
        heading: modalState?.heading || '',
        content: modalState?.content || '',
        items: modalState?.items || [],

        open: () => dispatch(openModal(modalId)),
        close: () => dispatch(closeModal(modalId)),
        setHeading: (heading: string) => dispatch(updateModalHeading({ modalId, heading })),
        setContent: (content: string) => dispatch(updateModalContent({ modalId, content })),
        setItems: (items: any[]) => dispatch(setModalItems({ modalId, items }))
    };
}