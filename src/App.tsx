import _ from 'lodash';
import { useState, useEffect } from 'react'
import { Alert, Button, Grid } from '@mui/material';
import './App.css';
import { InteractiveImage } from './components/InteractiveImage';
import ResponsiveAppBar, { Page } from './components/ResponsiveAppBar';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { openModal } from './redux/slices/modalsSlice';
import { ArmorModal } from './components/modals/ArmorModal';
import { WeaponModal } from './components/modals/WeaponModal';
import { HelmModal } from './components/modals/HelmModal';
import { MasteryModal } from './components/modals/MasteryModal';
import { PotionModal } from './components/modals/PotionModal';
import { ItemModal } from './components/modals/ItemModal';
import { CharacterState, loadCharacter, setCharacter, setLevel } from './redux/slices/characterSlice';
import { createBanner, toggleMasterySide } from './redux/slices/formSlice';
import RedoIcon from '@mui/icons-material/Redo';
import { DeckModal } from './components/modals/DeckModal';
import { getCharacter, submitCharacter } from './api/characterApi';
import { BannerMessage } from './components/BannerMessage';
import { useQueryParam } from './hooks/queryParam';
import { SaveModal } from './components/modals/SaveModal';

function App() {
  const dispatch = useAppDispatch();
  const characterData = useAppSelector((state) => state.character)
  const character = useAppSelector((state) => state.character.character)
  const level = useAppSelector((state) => state.character.level)
  const selectedHelm = useAppSelector((state) => state.character.helm);
  const selectedArmor = useAppSelector((state) => state.character.armor);
  const selectedWeapon = useAppSelector((state) => state.character.weapon);
  const selectedItem = useAppSelector((state) => state.character.item);
  const selectedPotions = useAppSelector((state) => state.character.potions);
  const selectedMastery = useAppSelector((state) => state.character.mastery);
  const showingMasteryFronts = useAppSelector((state) => state.form.showingMasteryFront);

  const [saveState, setSaveState] = useQueryParam('id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      try {
        setLoading(true);
        // Your async API call here
        const response = await getCharacter(saveState)
        const character_data = _.get(response, 'character_data');
        //dispatch(setArmor(_.get(character_data, 'armor', {} as Armor)));
        dispatch(loadCharacter(character_data))
      } catch (err) {
        dispatch(createBanner({ bannerMessage: 'Failed to load character data. Please wait a moment and try again', bannerSeverity: 'error' }))
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [saveState])

  const saveCharacter = async (characterData: CharacterState) => {
    try {
      setLoading(true);
      const response = await submitCharacter(characterData);
      setSaveState(_.get(response, 'id', ''));
      dispatch(createBanner({ bannerMessage: 'Save successful', bannerSeverity: 'success' }))
      dispatch(openModal('saveModal'))
    } catch {
      dispatch(createBanner({ bannerMessage: 'Save failed. Please wait a moment and try again', bannerSeverity: 'error' }))
    } finally {
      setLoading(false);
    }
  }

  const pages = [
    { name: 'Character', onChange: (character: string) => dispatch(setCharacter(character)) },
    { name: `Level ${level}`, onChange: (level: string) => dispatch(setLevel(level)) },
    { name: 'Mastery', onClick: () => dispatch(openModal('masteryModal')) },
    { name: 'Deck', onClick: () => dispatch(openModal('deckModal')) },
    { name: 'Weapon', onClick: () => dispatch(openModal('weaponModal')) },
    { name: 'Helmet', onClick: () => dispatch(openModal('helmModal')) },
    { name: 'Armor', onClick: () => dispatch(openModal('armorModal')) },
    { name: 'Item', onClick: () => dispatch(openModal('itemModal')) },
    { name: 'Potions', onClicks: [() => dispatch(openModal('potionModal0')), () => dispatch(openModal('potionModal1')), () => dispatch(openModal('potionModal2'))] },
    { name: 'Save', onClick: async () => saveCharacter(characterData), loading }
  ]

  return (
    <div className="App">
      <ResponsiveAppBar pages={pages as Page[]} />
      <BannerMessage />
      <Grid container spacing={2} style={{ alignItems: 'center', marginLeft: '20px', marginRight: '20px' }}>
        <Grid size={{ xs: 3, md: 2 }}>
          <div onClick={() => dispatch(openModal('deckModal'))}>
            <img src='/cards/thoreg_card_back.png' style={{
              maxWidth: '100%',
              height: 'auto'
            }} />
          </div>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <InteractiveImage imageSrc={`/cards/${character}_board.png`} imageAlt='test' highlightAreas={[
            {
              id: 'name',
              x: 36.16,
              y: 0,
              width: 26.86,
              height: 12.53,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => console.log('bong')
            },
            {
              id: 'weapon',
              x: 3.61,
              y: 18.66,
              width: 23.21,
              height: 64.22,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => dispatch(openModal('weaponModal')),
              itemSrc: _.get(selectedWeapon, 'path', '')
            },
            {
              id: 'helm',
              x: 29.79,
              y: 19.48,
              width: 20.03,
              height: 31.56,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => dispatch(openModal('helmModal')),
              itemSrc: _.get(selectedHelm, 'path', '')
            },
            {
              id: 'armor',
              x: 30.08,
              y: 53.06,
              width: 19.86,
              height: 30.65,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => dispatch(openModal('armorModal')),
              itemSrc: _.get(selectedArmor, 'path', '')
            },
            {
              id: 'item',
              x: 4.3,
              y: 90,
              width: 20.95,
              height: 30,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => dispatch(openModal('itemModal')),
              itemSrc: _.get(selectedItem, 'path', '')
            },
            {
              id: 'potion0',
              x: 27.89,
              y: 90,
              width: 20.95,
              height: 30,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => dispatch(openModal('potionModal0')),
              itemSrc: _.get(selectedPotions[0], 'path', '')
            },
            {
              id: 'potion1',
              x: 51.26,
              y: 90,
              width: 20.95,
              height: 30,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => dispatch(openModal('potionModal1')),
              itemSrc: _.get(selectedPotions[1], 'path', '')
            },
            {
              id: 'potion2',
              x: 74.62,
              y: 90,
              width: 20.95,
              height: 30,
              color: "rgba(255, 0, 0, 0.3)",
              onClick: () => dispatch(openModal('potionModal2')),
              itemSrc: _.get(selectedPotions[2], 'path', '')
            }
          ]} />
        </Grid>
        <Grid size={{ xs: 3, md: 2 }}>
          <div onClick={() => dispatch(openModal('masteryModal'))} style={{ cursor: 'pointer' }}>
            <img src={_.get(selectedMastery, `${showingMasteryFronts ? 'path' : 'back_path'}`, '')} style={{
              maxWidth: '100%',
              height: 'auto'
            }} />
          </div>
          <Button onClick={() => dispatch(toggleMasterySide())}><RedoIcon /></Button>
        </Grid>
      </Grid>
      <DeckModal />
      <ArmorModal />
      <HelmModal />
      <WeaponModal />
      <MasteryModal />
      <PotionModal slot={0} />
      <PotionModal slot={1} />
      <PotionModal slot={2} />
      <ItemModal />
      <SaveModal />
    </div>
  );
}

export default App;
