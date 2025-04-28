import _ from 'lodash';
import { useModal } from "../../hooks/modalHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Item, setItem, } from "../../redux/slices/characterSlice";
import { ItemCardModal } from "./ItemCardModal";

export const ItemModal = () => {
    const dispatch = useAppDispatch();
    const itemModal = useModal('itemModal');
    const baseItems = itemModal.items;
    const level = useAppSelector((state) => state.character.level);
    const textFilter = useAppSelector((state) => state.form.textFilter);

    const availableItems = _.filter(baseItems, (item) => {
        return _.get(item, 'level', 1) === level
            && (_.includes(_.get(item, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
                || _.includes(_.get(item, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase()));
    }) as Item[];

    return <ItemCardModal
        modalOpen={itemModal.open}
        modalClose={itemModal.close}
        isModalOpen={itemModal.isOpen}
        availableItems={availableItems}
        setSelectedItem={(item: Item) => dispatch(setItem(item))}
        heading={itemModal.heading}
    />
}