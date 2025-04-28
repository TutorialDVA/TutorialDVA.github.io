import _ from 'lodash';
import { useModal } from "../../hooks/modalHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Armor, setArmor } from "../../redux/slices/characterSlice";
import { ItemCardModal } from "./ItemCardModal";

export const ArmorModal = () => {
    const dispatch = useAppDispatch();
    const armorModal = useModal('armorModal');
    const baseArmors = armorModal.items;
    const level = useAppSelector((state) => state.character.level);
    const textFilter = useAppSelector((state) => state.form.textFilter);

    const availableArmors = _.filter(baseArmors, (armor) => {
        return _.get(armor, 'level', 1) === level
            &&
            (_.includes(_.get(armor, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
                || _.includes(_.get(armor, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase()));
    }) as Armor[];

    return <ItemCardModal
        modalOpen={armorModal.open}
        modalClose={armorModal.close}
        isModalOpen={armorModal.isOpen}
        availableItems={availableArmors}
        setSelectedItem={(armor: Armor) => dispatch(setArmor(armor))}
        heading={armorModal.heading}
    />
}