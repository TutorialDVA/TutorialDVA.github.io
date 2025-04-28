import _ from 'lodash';
import { useModal } from "../../hooks/modalHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Helm, setHelm } from "../../redux/slices/characterSlice";
import { ItemCardModal } from "./ItemCardModal";

export const HelmModal = () => {
    const dispatch = useAppDispatch();
    const helmModal = useModal('helmModal');
    const basehelms = helmModal.items;
    const level = useAppSelector((state) => state.character.level);
    const textFilter = useAppSelector((state) => state.form.textFilter);

    const availablehelms = _.filter(basehelms, (helm) => {
        return _.get(helm, 'level', 1) === level
            &&
            (_.includes(_.get(helm, 'name', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase())
                || _.includes(_.get(helm, 'text', '').toLocaleLowerCase(), textFilter.toLocaleLowerCase()));
    }) as Helm[];

    return <ItemCardModal
        modalOpen={helmModal.open}
        modalClose={helmModal.close}
        isModalOpen={helmModal.isOpen}
        availableItems={availablehelms}
        setSelectedItem={(helm: Helm) => dispatch(setHelm(helm))}
        heading={helmModal.heading}
    />
}