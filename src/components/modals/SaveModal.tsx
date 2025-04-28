import _ from 'lodash';
import { Box, Grid, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useQueryParam } from '../../hooks/queryParam';
import { useModal } from '../../hooks/modalHooks';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    height: '25%',
    p: 4,
    overflow: 'auto'
};

export interface ItemCardModalProps {
}

export const SaveModal = (props: ItemCardModalProps) => {
    const [id, setId] = useQueryParam('id');
    const saveModal = useModal(`saveModal`);

    return (
        <Modal
            open={saveModal.isOpen}
            onClose={saveModal.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={2} style={{
                    alignItems: 'center', marginLeft: '20px', marginRight: '20px', display: 'flex', marginBottom: '20px',
                    justifyContent: 'space-between'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Save successful
                    </Typography>
                </Grid>
                <TextField id="filled-basic" label='Link' variant="filled" value={`https://primaltheabuildening.pages.dev/?id=${id}`} style={{ width: '100%' }} />
            </Box>
        </Modal>
    )
}