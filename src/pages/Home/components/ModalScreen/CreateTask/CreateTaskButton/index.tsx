import { Box, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';

interface Props {
    handleOpenModal: () => void;
}

export const CreateTaskButton: React.FC<Props> = ({ handleOpenModal }) => {
    return (
        <Box bgcolor='secondary.main' color='common.white' borderRadius='50%'>
            <IconButton size='small' onClick={handleOpenModal} color='inherit'>
                <Add style={{ fontSize: 40 }} color='inherit' />
            </IconButton>
        </Box>
    );
};
