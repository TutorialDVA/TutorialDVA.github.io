import _ from 'lodash';
import { useModal } from "../../hooks/modalHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Item, setPotion, } from "../../redux/slices/characterSlice";
import { ItemCardModal } from "./ItemCardModal";

interface PotionModalProps {
    slot: number;
}

export const PotionModal = (props: PotionModalProps) => {
    const dispatch = useAppDispatch();
    const potionModal = useModal(`potionModal${props.slot}`);
    const basePotions = potionModal.items;
    const level = useAppSelector((state) => state.character.level);
    const textFilter = useAppSelector((state) => state.form.textFilter);

    const availablePotions = _.filter(basePotions, (potion) => {
        return _.get(potion, 'level', 1) === level
            && (_.includes(_.get(potion, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
                || _.includes(_.get(potion, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase()));
    }) as Item[];

    return <ItemCardModal
        modalOpen={potionModal.open}
        modalClose={potionModal.close}
        isModalOpen={potionModal.isOpen}
        availableItems={availablePotions}
        setSelectedItem={(potion: Item) => dispatch(setPotion({ potion, slot: props.slot }))}
        heading={potionModal.heading}
    />
}