import _ from 'lodash';
import { Box, Grid, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { setTextFilter } from '../../redux/slices/formSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

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

export interface ItemCardModalProps {
    modalOpen: () => void;
    modalClose: () => void;
    isModalOpen: boolean;
    availableItems: Record<string, any>[];
    setSelectedItem: (value: any) => void;
    heading: string;
}

export const ItemCardModal = (props: ItemCardModalProps) => {
    const dispatch = useAppDispatch();
    const textFilter = useAppSelector((state) => state.form.textFilter);

    return (
        <Modal
            open={props.isModalOpen}
            onClose={props.modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={2} style={{
                    alignItems: 'center', marginLeft: '20px', marginRight: '20px', display: 'flex', marginBottom: '20px',
                    justifyContent: 'space-between'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.heading}
                    </Typography>
                    <TextField id="outlined-basic" label="Search..." variant="outlined" onChange={(event) => dispatch(setTextFilter(event.target.value))} value={textFilter} />
                </Grid>
                <Grid container spacing={2} style={{ alignItems: 'center', marginLeft: '20px', marginRight: '20px' }}>
                    {_.map(props.availableItems, (item) => {
                        return (
                            <Grid size={{ xs: 4, md: 4 }}>
                                <div onClick={() => {
                                    props.setSelectedItem(item)
                                    props.modalClose()
                                }} >
                                    <img src={_.get(item, 'path', '')} style={{
                                        maxWidth: '100%',
                                        height: 'auto'
                                    }} />
                                </div>
                            </Grid>)
                    })}
                </Grid>
            </Box>
        </Modal>
    )
}