
import _ from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Armor, Item, Helm, Mastery, Weapon, PlayerCard } from "./characterSlice";
import armors from '../../constants/cardData/armors.json';
import helmets from '../../constants/cardData/helms.json';
import weapons from '../../constants/cardData/weapons.json';
import masteries from '../../constants/cardData/mastery_cards.json';
import items from '../../constants/cardData/items.json';
import potions from '../../constants/cardData/potions.json';
import dareon_cards from '../../constants/cardData/dareon_cards.json';
import heleren_cards from '../../constants/cardData/heleren_cards.json';
import karah_cards from '../../constants/cardData/karah_cards.json';
import ljonar_cards from '../../constants/cardData/ljonar_cards.json';
import thoreg_cards from '../../constants/cardData/thoreg_cards.json';
import mirah_cards from '../../constants/cardData/mirah_cards.json';

interface ModalItem {
    id: string;
}

interface ModalState {
    isOpen: boolean;
    heading: string;
    content: string;
    items: Armor[] | Item[] | Helm[] | Mastery[] | Weapon[] | { dareon: PlayerCard[], heleren: PlayerCard[], karah: PlayerCard[], ljonar: PlayerCard[], thoreg: PlayerCard[], mirah: PlayerCard[] };
}

interface ModalsState {
    [modalId: string]: ModalState;
}

const initialState: ModalsState = {
    armorModal: {
        isOpen: false,
        heading: 'Armor',
        content: '',
        items: armors.armorCards
    },
    helmModal: {
        isOpen: false,
        heading: 'Helmets',
        content: '',
        items: helmets.helm_cards
    },
    weaponModal: {
        isOpen: false,
        heading: 'Weapons',
        content: '',
        items: weapons as Weapon[]
    },
    masteryModal: {
        isOpen: false,
        heading: 'Masteries',
        content: '',
        items: _.map(masteries, (mastery) => mastery) as Mastery[]
    },
    itemModal: {
        isOpen: false,
        heading: 'Items',
        content: '',
        items: items
    },
    potionModal0: {
        isOpen: false,
        heading: 'Potions',
        content: '',
        items: potions,
    },
    potionModal1: {
        isOpen: false,
        heading: 'Potions',
        content: '',
        items: potions,
    },
    potionModal2: {
        isOpen: false,
        heading: 'Potions',
        content: '',
        items: potions,
    },
    deckModal: {
        isOpen: false,
        heading: 'Deck',
        content: '',
        items: {
            dareon: dareon_cards,
            karah: karah_cards,
            ljonar: ljonar_cards,
            mirah: mirah_cards,
            thoreg: thoreg_cards,
            heleren: heleren_cards
        }
    },
    saveModal: {
        isOpen: false,
        heading: 'Save Complete',
        content: '',
        items: []
    }
}

// Create actions and reducer
const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        // Open a modal
        openModal: (state, action: PayloadAction<string>) => {
            const modalId = action.payload;
            if (state[modalId]) {
                state[modalId].isOpen = true;
            }
        },

        // Close a modal
        closeModal: (state, _action: PayloadAction<string>) => {
            _.forEach(state, (_value, key) => {
                state[key].isOpen = false;
            })
        },

        // Update modal heading
        updateModalHeading: (
            state,
            action: PayloadAction<{ modalId: string; heading: string }>
        ) => {
            const { modalId, heading } = action.payload;
            if (state[modalId]) {
                state[modalId].heading = heading;
            }
        },

        // Update modal content string
        updateModalContent: (
            state,
            action: PayloadAction<{ modalId: string; content: string }>
        ) => {
            const { modalId, content } = action.payload;
            if (state[modalId]) {
                state[modalId].content = content;
            }
        },

        // Set modal items array
        setModalItems: (
            state,
            action: PayloadAction<{ modalId: string; items: Armor[] | Item[] | Helm[] | Mastery[] }>
        ) => {
            const { modalId, items } = action.payload;
            if (state[modalId]) {
                state[modalId].items = items;
            }
        }
    }
});

export const {
    openModal,
    closeModal,
    updateModalHeading,
    updateModalContent,
    setModalItems
} = modalsSlice.actions;

export default modalsSlice.reducer;

