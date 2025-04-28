import _ from 'lodash';
import { useModal } from "../../hooks/modalHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Weapon, setWeapon } from "../../redux/slices/characterSlice";
import { ItemCardModal } from "./ItemCardModal";

export const WeaponModal = () => {
    const dispatch = useAppDispatch();
    const weaponModal = useModal('weaponModal');
    const baseWeapons = weaponModal.items;
    const level = useAppSelector((state) => state.character.level);
    const textFilter = useAppSelector((state) => state.form.textFilter);
    const character = useAppSelector((state) => state.character.character);

    const availableWeapons = _.filter(baseWeapons, (weapon) => {
        return _.get(weapon, 'level', 1) === level
            && _.get(weapon, 'character', '') === character
            && (_.includes(_.get(weapon, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
                || _.includes(_.get(weapon, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase()));
    }) as Weapon[];

    return <ItemCardModal
        modalOpen={weaponModal.open}
        modalClose={weaponModal.close}
        isModalOpen={weaponModal.isOpen}
        availableItems={availableWeapons}
        setSelectedItem={(weapon: Weapon) => dispatch(setWeapon(weapon))}
        heading={weaponModal.heading}
    />
}