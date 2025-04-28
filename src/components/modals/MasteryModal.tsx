import _ from 'lodash';
import { useModal } from "../../hooks/modalHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Mastery, setMastery, } from "../../redux/slices/characterSlice";
import { ItemCardModal } from "./ItemCardModal";

export const MasteryModal = () => {
    const dispatch = useAppDispatch();
    const masteryModal = useModal('masteryModal');
    const baseMasteries = masteryModal.items;
    const level = useAppSelector((state) => state.character.level);
    const textFilter = useAppSelector((state) => state.form.textFilter);
    const character = useAppSelector((state) => state.character.character);

    const availableMasteries = _.filter(baseMasteries, (mastery) => {
        return _.get(mastery, 'level', 1) === level
            && _.get(mastery, 'character', '') === character
            && (_.includes(_.get(mastery, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
                || _.includes(_.get(mastery, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase()));
    }) as Mastery[];

    return <ItemCardModal
        modalOpen={masteryModal.open}
        modalClose={masteryModal.close}
        isModalOpen={masteryModal.isOpen}
        availableItems={availableMasteries}
        setSelectedItem={(mastery: Mastery) => dispatch(setMastery(mastery))}
        heading={masteryModal.heading}
    />
}