import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { DeepEqualSet, deserializeDeepEqualSet, serializeDeepEqualSet } from '../../helpers/deepEqualSet';

export interface Item {
    name: string;
    level: number;
    text: string;
    path: string;
}

export interface Armor extends Item {
    hp: number;
}

export interface Helm extends Item {
    hp: number;
}

export interface Mastery {
    name: string;
    path: string;
    front_text: string;
    back_text: string;
    symbol: string;
    back_path: string;
    character: string;
}

export interface Weapon {
    character: string;
    name: string;
    level: number;
    damage: number;
    cards: {
        red: number;
        blue: number;
        yellow: number;
        green: number;
    },
    text: string;
    path: string;
}

export interface PlayerCard {
    name: string;
    cost: number | string;
    color: string;
    is_aggro: boolean;
    stamina: number;
    text: string;
    path: string;
    set: string;
}

// Define a type for the slice state
export interface CharacterState {
    character: string;
    level: number;
    armor: Armor;
    helm: Helm;
    item?: Item;
    mastery: Mastery;
    potions: Item[];
    weapon: Weapon;
    deck: DeepEqualSet<PlayerCard>;
    changedCharacter: boolean;
}

interface AddPotionPayload {
    potion: Item;
    slot: number;
}

// Define the initial state using that type
const initialState: CharacterState = {
    character: 'dareon',
    level: 1,
    armor: {
        "name": "Base Armor",
        "level": 1,
        "hp": 5,
        "text": "",
        "path": "/cards/armors/1/base_armor.png"
    },
    helm: {
        "name": "Base Helm",
        "level": 1,
        "hp": 4,
        "text": "",
        "path": "cards/helms/1/base_helm.png"
    },
    item: undefined,
    mastery: {
        "name": "DRAGON TAMER",
        "path": "cards/masteries/fronts/dragon_tamer.png",
        "back_path": "cards/masteries/backs/dragon_tamer.png",
        "symbol": "",
        "front_text": "When you reduce the monster to 0 struggle, place a counter on this card.",
        "back_text": "When a behavior card is revealed and the monster has 1 or less struggle, you may immediately place your miniature on that behavior card. If you do, cancel the effects of that card and perform a riding check",
        "character": "thoreg"
    },
    potions: Array(3).fill(null),
    weapon: {
        "character": "thoreg",
        "name": "Hammer",
        "level": 1,
        "damage": 2,
        "cards": {
            "red": 6,
            "blue": 6,
            "yellow": 6,
            "green": 6
        },
        "text": "Blue: If you are in the front sector, increase the struggle the maneuver removes by 1.",
        "path": "cards/weapons/level1/hammer.png"
    },
    deck: serializeDeepEqualSet(new DeepEqualSet<PlayerCard>),
    changedCharacter: false
}

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        loadCharacter: (_state, action: PayloadAction<CharacterState>) => {
            return {
                character: action.payload.character,
                level: action.payload.level,
                armor: action.payload.armor,
                deck: action.payload.deck,
                helm: action.payload.helm,
                mastery: action.payload.mastery,
                potions: action.payload.potions,
                weapon: action.payload.weapon,
                item: action.payload.item,
                changedCharacter: false
            }
        },
        setCharacter: (state, action: PayloadAction<string>) => {
            state.character = action.payload;
            state.changedCharacter = true;
        },
        setHelm: (state, action: PayloadAction<Helm>) => {
            state.helm = action.payload;
        },
        setArmor: (state, action: PayloadAction<Armor>) => {
            state.armor = action.payload;
        },
        setItem: (state, action: PayloadAction<Item>) => {
            state.item = action.payload;
        },
        setWeapon: (state, action: PayloadAction<Weapon>) => {
            state.weapon = action.payload;
        },
        setPotion: (state, action: PayloadAction<AddPotionPayload>) => {
            const { potion, slot } = action.payload;

            if (slot >= 0 && slot < state.potions.length) {
                state.potions[slot] = potion;
            }
        },
        setPotions: (state, action: PayloadAction<Item[]>) => {
            state.potions = action.payload;
        },
        setMastery: (state, action: PayloadAction<Mastery>) => {
            state.mastery = action.payload;
        },
        setLevel: (state, action: PayloadAction<string>) => {
            state.level = _.toNumber(action.payload);
        },
        addCardToDeck: (state, action: PayloadAction<PlayerCard>) => {
            const currentDeck = deserializeDeepEqualSet(state.deck);
            currentDeck.add(action.payload);
            return {
                ...state,
                deck: serializeDeepEqualSet(currentDeck)
            }
        },
        removeCardFromDeck: (state, action: PayloadAction<PlayerCard>) => {
            const currentDeck = deserializeDeepEqualSet(state.deck);
            currentDeck.delete(action.payload);
            return {
                ...state,
                deck: serializeDeepEqualSet(currentDeck)
            }
        },
        toggleCardInDeck: (state, action: PayloadAction<PlayerCard>) => {
            const currentDeck = deserializeDeepEqualSet(state.deck);
            currentDeck.has(action.payload) ? currentDeck.delete(action.payload) : currentDeck.add(action.payload);
            return {
                ...state,
                deck: serializeDeepEqualSet(currentDeck)
            }
        },
        resetDeck: (state) => {
            const currentDeck = deserializeDeepEqualSet(state.deck);
            currentDeck.clear()
            return {
                ...state,
                deck: serializeDeepEqualSet(currentDeck),
                changedCharacter: false
            }
        },
    },
})

export const { loadCharacter, setCharacter, setHelm, setArmor, setItem, setWeapon, setPotion, setMastery, setLevel, addCardToDeck, removeCardFromDeck, toggleCardInDeck, resetDeck } = characterSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.character.value
export const selectDeckValues = (state: RootState) => {
    const currentDeck = deserializeDeepEqualSet(state.character.deck);
    return currentDeck.values();
}

export const selectDeck = (state: RootState) => {
    const currentDeck = deserializeDeepEqualSet(state.character.deck);
    return currentDeck;
}

export default characterSlice.reducer