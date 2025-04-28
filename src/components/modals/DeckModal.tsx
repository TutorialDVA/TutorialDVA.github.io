import _ from 'lodash';
import { useModal } from "../../hooks/modalHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleCardInDeck, PlayerCard, selectDeck, addCardToDeck, resetDeck } from "../../redux/slices/characterSlice";
import { DeepEqualSet } from '../../helpers/deepEqualSet';
import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Tab, Table, TableContainer, Tabs, TextField, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import { setTextFilter } from '../../redux/slices/formSlice';
import { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    height: '70%',
    p: 4,
    overflow: 'auto'
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}


export const DeckModal = () => {
    const dispatch = useAppDispatch();
    const deckModal = useModal('deckModal');
    const baseDeck = deckModal.items;
    const character = useAppSelector((state) => state.character.character);
    const textFilter = useAppSelector((state) => state.form.textFilter);
    const weapon = useAppSelector((state) => state.character.weapon);
    const deck: DeepEqualSet<PlayerCard> = useAppSelector((state) => selectDeck(state)) as DeepEqualSet<PlayerCard>

    const sets = [
        'S',
        'A1',
        'A2',
        'B1',
        'B2',
        'C1',
        'C2',
        'D1',
        'D2',
        'E1',
        'E2'
    ]
    const [selectedSets, setSelectedSets] = useState<string[]>([]);
    const handleSetChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setSelectedSets(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const colors = [
        'blue',
        'green',
        'red',
        'yellow'
    ];
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const handleColorChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setSelectedColors(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const cards = _.sortBy(_.filter(_.get(baseDeck, character, baseDeck), (card: PlayerCard) => {
        return (_.includes(selectedSets, _.get(card, 'set')) || _.isEmpty(selectedSets)) && (_.includes(_.get(card, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
            || _.includes(_.get(card, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())) && (_.isEmpty(selectedColors) || _.includes(selectedColors, _.get(card, 'color')));
    }) as PlayerCard[], ['set', 'color']);
    const visibleDeckCards = _.sortBy(_.filter(_.get(deck.values(), character, deck.values()), (card: PlayerCard) => {
        return (_.includes(selectedSets, _.get(card, 'set')) || _.isEmpty(selectedSets)) && (_.includes(_.get(card, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
            || _.includes(_.get(card, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())) && (_.isEmpty(selectedColors) || _.includes(selectedColors, _.get(card, 'color')));
    }) as PlayerCard[], ['set', 'color']);

    useEffect(() => {
        const allCardsForCharacter = _.filter(_.get(baseDeck, character, baseDeck), (card: PlayerCard) => {
            return _.get(card, 'set') === 'S'
        }) as PlayerCard[];
        dispatch(resetDeck());
        _.forEach(allCardsForCharacter, (card) => {
            dispatch(addCardToDeck(card));
        })
    }, [character])


    const rows = [
        createData('Weapon requirements', weapon.cards.red, weapon.cards.blue, weapon.cards.yellow, weapon.cards.green),
        createData('Cards in deck', _.filter(deck.values(), (card: PlayerCard) => card.color === 'red').length, _.filter(deck.values(), (card: PlayerCard) => card.color === 'blue').length, _.filter(deck.values(), (card: PlayerCard) => card.color === 'yellow').length, _.filter(deck.values(), (card: PlayerCard) => card.color === 'green').length),
    ];

    return (
        <Modal
            open={deckModal.isOpen}
            onClose={deckModal.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={2} style={{
                    alignItems: 'center', marginLeft: '20px', marginRight: '20px', display: 'flex', marginBottom: '20px',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ width: '100%' }}>
                        <div style={{ alignItems: 'center', display: 'flex' }}>
                            <TextField id="outlined-basic" label="Search..." variant="outlined" onChange={(event) => dispatch(setTextFilter(event.target.value))} value={textFilter} />
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-name-label">Color</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={selectedColors}
                                    onChange={handleColorChange}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {colors.map((color) => (
                                        <MenuItem
                                            key={color}
                                            value={color}
                                        >
                                            {color}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-name-label">Set</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={selectedSets}
                                    onChange={handleSetChange}
                                    input={<OutlinedInput label="Set" />}
                                    MenuProps={MenuProps}
                                >
                                    {sets.map((set) => (
                                        <MenuItem
                                            key={set}
                                            value={set}
                                        >
                                            {set}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '4px' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Deck" />
                                <Tab label="Available cards" />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <TableContainer component={Paper} style={{ marginBottom: '12px' }}>
                                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell align="right">Red</TableCell>
                                            <TableCell align="right">Blue</TableCell>
                                            <TableCell align="right">Yellow</TableCell>
                                            <TableCell align="right">Green</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid container spacing={2} style={{ alignItems: 'center', marginLeft: '20px', marginRight: '20px' }}>
                                {_.map(visibleDeckCards, (item) => {
                                    return (
                                        <Grid size={{ xs: 4, md: 4 }}>
                                            <div onClick={() => {
                                                dispatch(toggleCardInDeck(item))
                                            }} >
                                                <img src={_.get(item, 'path', '')} style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                }} />
                                            </div>
                                        </Grid>)
                                })}
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={2} style={{ alignItems: 'center', marginLeft: '20px', marginRight: '20px' }}>
                                {_.map(cards, (item) => {
                                    return (
                                        <Grid size={{ xs: 4, md: 4 }}>
                                            <div onClick={() => {
                                                dispatch(toggleCardInDeck(item))
                                            }} >
                                                <img src={_.get(item, 'path', '')} style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    border: `${!_.isNil(deck) && deck.has(item as PlayerCard) ? '2px red solid' : ''}`
                                                }} />
                                            </div>
                                        </Grid>)
                                })}
                            </Grid>
                        </CustomTabPanel>
                    </Box>
                </Grid>

            </Box>
        </Modal>
    )
}