import {
    Box,
    IconButton,
    TableCell,
    TableRow,
    Typography,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';

interface Props {
    momentContext: moment.Moment;
    handleNextMonth: () => void;
    handlePrevMonth: () => void;
}

export const CalendarNav: React.FC<Props> = ({
    momentContext,
    handleNextMonth,
    handlePrevMonth,
}) => {
    return (
        <TableRow>
            <TableCell colSpan={7}>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Box>
                        <IconButton
                            size='small'
                            color='inherit'
                            onClick={handlePrevMonth}
                        >
                            <ChevronLeft fontSize='large' color='inherit' />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography component='span'>
                            {momentContext.format('MMMM')}
                        </Typography>
                        <Typography component='span'>
                            {momentContext.format('Y')}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton
                            size='small'
                            color='inherit'
                            onClick={handleNextMonth}
                        >
                            <ChevronRight fontSize='large' color='inherit' />
                        </IconButton>
                    </Box>
                </Box>
            </TableCell>
        </TableRow>
    );
};
